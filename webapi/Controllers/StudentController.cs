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
        [HttpGet("GetStudentById")]
        public async Task<IActionResult> GetStudentById(Guid Id)
        {
            var ss = await _studentService.GetStudentById(Id);
            if (ss == null) return NotFound();

            return Ok(ss);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetStudentByIdWithSubjects")]
        public async Task<IActionResult> GetStudentByIdWithSubjects(Guid Id)
        {
            var ss = await _studentService.GetStudentByIdIncludeAll(Id);
            if (ss == null) return NotFound();

            var res = new StudentDto()
            {
                Id = ss.Id,
                FirstName = ss.User.FirstName,
                LastName = ss.User.LastName,
                EmailAddress = ss.User.EmailAddress,
                Subjects = ss.StudentSubjects.Select(ss => ss.Subject).ToList()
            };
            return Ok(res);
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
        [HttpPost("AddStudent")]
        public async Task<IActionResult> AddStudent(StudentSaveDto student)
        {
            var result = await _studentService.NewStudent(student);
            return Ok(student);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Update")]
        public async Task<IActionResult> Update(StudentSaveDto student)
        {
            var result = await _studentService.UpdateStudent(student);
            return Ok(student);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            return Ok(await _studentService.Delete(Id));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddStudentSubject(Guid studentId, Guid subjectId)
        {
            var result = await _studentService.AddStudentSubject(studentId, subjectId);
            if (result == null) return NotFound();

            return Ok(result);
        }


        [Authorize(Roles = "Admin")]
        [HttpPost("AddStudentSubjects")]
        public async Task<IActionResult> AddStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects)
        {
            var result = await _studentService.AddStudentSubjects(studentId, studentSubjects);
            if (result == null) return NotFound();

            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("UpdateStudentSubjects")]
        public async Task<IActionResult> UpdateStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects)
        {
            var result = await _studentService.UpdateStudentSubjects(studentId, studentSubjects);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("UpdateStudentGrades")]
        public async Task<IActionResult> UpdateStudentGrades(GradeSaveDto grades)
        {
            var result = await _studentService.UpdateStudentGrades(grades);
            return Ok(result);
        }
    }
}
