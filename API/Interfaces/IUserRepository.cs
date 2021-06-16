using API.DTOs;
using API.Entities;
using API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string userName);
        Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams);
        Task<AppUser> GetUserByPhotoId(int photoId);
        Task<MemberDTO> GetMemberAsync(int id, bool isCurrentUser);
        Task<string> GetUserGender(int userId);
    }
}
