using API.Controllers;
using DatingApp.API.Data;
using DatingApp.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{

    public class UsersController(DataContext context) : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async  Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await context.Users.ToListAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id:int}")]   //api/users/1
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}