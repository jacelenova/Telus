using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.Interfaces;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController: ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var res = await _studentService.IncludeMultiple(s => s.User);
            var dtos = res.Select(s =>
            {
                return new StudentDto()
                {
                    Id = s.Id,
                    FirstName = s.User.FirstName,
                    LastName = s.User.LastName,
                    EmailAddress = s.User.EmailAddress
                };
            });
            return Ok(dtos);
        }

        [Authorize]
        [HttpGet("GetStudentGrade")]
        public async Task<IActionResult> GetStudentGrade(Guid Id)
        {
            var ss = await _studentService.GetSubjectsByStudentId(Id);
            var result = ss.Select(s => new GradesDto() { SubjectId = s.SubjectId, SubjectName = s.Subject.Name, Grade = s.Grade}).ToList();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add(StudentSaveDto student)
        {
            var result = await _studentService.NewStudent(student);
            return Ok(student);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            return Ok(await _studentService.Delete(Id));
        }
    }
}
