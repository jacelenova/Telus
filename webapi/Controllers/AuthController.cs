using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IStudentService _studentService;
        public AuthController(IAuthService authService, IStudentService studentService)
        {
            _authService = authService;
            _studentService = studentService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(Login login)
        {
            var user = await _authService.GetUser(login.username, login.password);
            if (user == null)
            {
                return NotFound();
            }

            var userDto = new UserDto(user);
            if (user.Role == Role.Student)
            {
                var student = await _studentService.GetStudentByUserId(user.Id);
                if (student != null) userDto.StudentId = student.Id;
            }
            
            var token = _authService.GenerateToken(user);
            return Ok(new { Token = token, User = userDto });
        }
    }

    public class Login
    {
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }
}
