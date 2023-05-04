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
        private readonly IStudentService _studentService;

        public UserController(IUserService userService, IStudentService studentService)
        {
            _userService = userService;
            _studentService = studentService;
        }

        [Authorize]
        [HttpGet("getcurrentuser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            Request.Headers.TryGetValue("Authorization", out var headerValue);
            var token = headerValue.ToString().Split(' ')[1];
            var user = await _userService.GetCurrentUser();
            if (user == null) return NotFound();

            var dto = new UserDto(user);
            var stud = await _studentService.GetStudentByUserId(user.Id);
            if (stud != null)
            {
                dto.StudentId = stud.Id;
            }

            return Ok(dto);
        }
    }
}
