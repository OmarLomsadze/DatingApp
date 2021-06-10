using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IMessageRepository _messageRep;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRep;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;

        public MessageHub(IMessageRepository messageRep, IMapper mapper, IUserRepository userRep, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker)
        {
            _messageRep = messageRep;
            _mapper = mapper;
            _userRep = userRep;
            _presenceHub = presenceHub;
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var otherUser = httpContext.Request.Query["user"].ToString();

            var groupName = GetGroupName(Context.User.GetUsername(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var group = await AddToGroup(groupName);

            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            var messages = await _messageRep.GetMessageThread(Context.User.GetUsername(), otherUser);

            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
            var group = await RemoveFromMessageGroup();

            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);

            await base.OnDisconnectedAsync(ex);
        }

        public async Task SendMessage(CreateMessageDTO createMessageDTO)
        {
            var username = Context.User.GetUsername();

            if (username == createMessageDTO.RecipientUsername.ToLower()) throw new HubException("You cannot send messages To Yourself!");

            var sender = await _userRep.GetUserByUsernameAsync(username);
            var recipient = await _userRep.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

            if (recipient == null) throw new HubException("Not Found");

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDTO.Content
            };

            var groupName = GetGroupName(sender.UserName, recipient.UserName);

            var group = await _messageRep.GetMessageGroup(groupName);

            if (group.Connections.Any(x => x.Username == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections = await _tracker.GetCOnnectionsForUser(recipient.UserName);
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived", new { username = sender.UserName, knownAs = sender.KnownAs });
                }
            }

            _messageRep.AddMessage(message);

            if (await _messageRep.SaveAllAsync())
            {
                await Clients.Group(groupName).SendAsync("NewMessage", _mapper.Map<MessageDTO>(message));
            }
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }

        private async Task<Group> AddToGroup(string groupName)
        {
            var group = await _messageRep.GetMessageGroup(groupName);

            var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null)
            {
                group = new Group(groupName);
                _messageRep.AddGroup(group);
            }

            group.Connections.Add(connection);

            if (await _messageRep.SaveAllAsync()) return group;

            throw new HubException("Failed To Join Group");
        } 

        private async Task<Group> RemoveFromMessageGroup()
        {
            var group = await _messageRep.GetGroupForConnection(Context.ConnectionId);

            var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);

            _messageRep.RemoveConnection(connection);

            if (await _messageRep.SaveAllAsync()) return group;

            throw new HubException("Failed To Remove From Group");
        }
    }
}
