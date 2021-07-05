using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>()
                .ForMember(x => x.PhotoUrl, o => o.MapFrom(l => l.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.Age, o => o.MapFrom(l => l.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDTO>().ReverseMap();

            CreateMap<MemberUpdateDTO, AppUser>();
            CreateMap<UsernameDTO, AppUser>();

            CreateMap<RegisterDTO, AppUser>();

            CreateMap<Message, MessageDTO>()
                .ForMember(x => x.SenderPhotoUrl, o => o.MapFrom(l => l.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(x => x.RecipientPhotoUrl, o => o.MapFrom(l => l.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));


            CreateMap<MessageDTO, Message>();
            CreateMap<MessengersDTO, Message>().ReverseMap();

            CreateMap<Message, TudaSudaDTO>().ReverseMap();
        }
    }
}
