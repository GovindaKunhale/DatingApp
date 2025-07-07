using API.Controllers;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{

    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]   //api/users/dave
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetMemberAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}