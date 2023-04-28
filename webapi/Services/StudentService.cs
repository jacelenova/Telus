using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public class StudentService: BaseService<Student>, IStudentService
    {
        public StudentService(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<IEnumerable<StudentSubject>> GetSubjectsByStudentId(Guid studentId)
        {
            return await _context.StudentSubjects.Include(s => s.Subject).Where(s => s.StudentId == studentId).ToListAsync();
        }

        public async Task<Student?> GetStudentByUserId(Guid userId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<Student?> NewStudent(StudentSaveDto newStudent)
        {
            var user = new User() { Id = Guid.NewGuid(), FirstName =  newStudent.FirstName, LastName = newStudent.LastName, EmailAddress = newStudent.EmailAddress, Password = "1", Role = Role.Student};
            var stud = new Student() { Id = newStudent.Id, UserId = user.Id };

            _context.Users.Add(user);
            _context.Students.Add(stud);
            await _context.SaveChangesAsync();

            return stud;
        }
    }
}
