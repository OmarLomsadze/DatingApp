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
            CreateMap<Photo, PhotoDTO>();

            CreateMap<MemberUpdateDTO, AppUser>();
        }
    }
}
