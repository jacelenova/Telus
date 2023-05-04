using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("getcurrentuser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString().Split(' ')[1];
            var user = await _userService.GetCurrentUser();
            if (user == null) return NotFound();

            return Ok(user);
        }
    }
}
