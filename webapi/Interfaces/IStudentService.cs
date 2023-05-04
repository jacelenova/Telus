using webapi.Models;

namespace webapi.Interfaces
{
    public interface IStudentService: IBaseService<Student>
    {
        Task<IEnumerable<StudentSubject>> GetSubjectsByStudentId(Guid studentId);
        Task<Student?> GetStudentByUserId(Guid userId);
        Task<Student?> NewStudent(StudentSaveDto newStudent);
        Task<Student> UpdateStudent(StudentSaveDto student);
        Task<Student?> GetStudentById(Guid studentId);
        Task<Student?> GetStudentByIdIncludeAll(Guid studentId);
        Task<StudentSubject?> AddStudentSubject(Guid studentId, Guid subjectId);
        Task<List<StudentSubject>> AddStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects);
        Task<List<StudentSubject>> UpdateStudentSubjects(Guid studentId, List<StudentSubject> studentSubjects, bool deleteMissing = false);
        Task<List<StudentSubject>> UpdateStudentGrades(GradeSaveDto grades);
    }
}
