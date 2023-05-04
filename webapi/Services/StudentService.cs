using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Linq;
using System.Xml.Schema;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public class StudentService: BaseService<Student>, IStudentService
    {
        private ISubjectService _subjectService;

        public StudentService(ApplicationDbContext dbContext, ISubjectService subjectService) : base(dbContext)
        {
            _subjectService = subjectService;
        }

        public async Task<IEnumerable<StudentSubject>> GetSubjectsByStudentId(Guid studentId)
        {
            return await _context.StudentSubjects.Include(s => s.Subject).Where(s => s.StudentId == studentId).ToListAsync();
        }

        public async Task<Student?> GetStudentByUserId(Guid userId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.UserId == userId);
        }

        public async Task<Student?> GetStudentById(Guid studentId)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.Id == studentId);
        }

        public async Task<Student?> GetStudentByIdIncludeAll(Guid studentId)
        {
            return await _context.Students
                .Include(s => s.User)
                .Include(s => s.StudentSubjects)
                    .ThenInclude(ss => ss.Subject)
                .FirstOrDefaultAsync(s => s.Id == studentId);
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

        public async Task<Student> UpdateStudent(StudentSaveDto student)
        {
            var stud = await GetStudentByIdIncludeAll(student.Id);
            if (stud != null)
            {
                stud.User.FirstName = student.FirstName;
                stud.User.LastName = student.LastName;

                foreach (var ss in stud.StudentSubjects)
                {
                    var found = student.Subjects.FirstOrDefault(s => ss.SubjectId == s.Id);
                    if (found == null)
                    {
                        _context.StudentSubjects.Remove(ss);
                    }
                }

                foreach (var s in student.Subjects)
                {
                    var found = stud.StudentSubjects.FirstOrDefault(ss => ss.SubjectId == s.Id);
                    if (found == null)
                    {
                        _context.StudentSubjects.Add(new StudentSubject() { Id = Guid.NewGuid(), StudentId = stud.Id, SubjectId = s.Id });
                    }
                }
            }

            await _context.SaveChangesAsync();
            return await GetStudentByIdIncludeAll(stud.Id);
        }

        public async Task<StudentSubject?> AddStudentSubject(Guid studentId, Guid subjectId)
        {
            var subj = await _subjectService.GetById(subjectId);
            var student = await _subjectService.GetById(studentId);
            if (subj == null || student == null)
            {
                return null;
            }

            var studentSubject = new StudentSubject() {  Id = studentId, SubjectId = subjectId };
            _context.StudentSubjects.Add(studentSubject);
            await _context.SaveChangesAsync();

            return studentSubject;
        }

        public async Task<List<StudentSubject>> AddStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects)
        {
            studentSubjects = studentSubjects.Where(ss => ss.StudentId ==  studentId).ToList();
            if (studentSubjects.Count == 0) return studentSubjects;

            _context.StudentSubjects.AddRange(studentSubjects);
            await _context.SaveChangesAsync();

            return studentSubjects;
        }

        public async Task<List<StudentSubject>> UpdateStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects, bool deleteMissing = false)
        {
            studentSubjects = studentSubjects.Where(s => s.StudentId == studentId).ToList();
            var subjects = await _context.StudentSubjects.Where(s => s.StudentId != studentId).ToListAsync();

            if (deleteMissing)
            {
                var subjIds = subjects.Select(s => s.Id);
                var toDeleteIds = subjIds.Except(studentSubjects.Select(s => s.Id));
                var toDelete = subjects.Where(s => toDeleteIds.Contains(s.Id));
                _context.StudentSubjects.RemoveRange(toDelete);
            }

            _context.UpdateRange(studentSubjects);
            await _context.SaveChangesAsync();

            return await _context.StudentSubjects.Where(ss => ss.StudentId == studentId).ToListAsync();
        }

        public async Task<List<StudentSubject>> UpdateStudentGrades(GradeSaveDto grades)
        {
            var subjects = await GetSubjectsByStudentId(grades.StudentId);
            foreach (var grade in grades.Grades)
            {
                var found = subjects.FirstOrDefault(s => s.SubjectId == grade.SubjectId);
                if (found != null)
                {
                    found.Grade = grade.Grade;
                }
            }

            await _context.SaveChangesAsync();
            var res = await GetSubjectsByStudentId(grades.StudentId);
            return res.ToList();
        }
    }
}
