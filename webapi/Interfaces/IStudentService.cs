using webapi.Models;

namespace webapi.Interfaces
{
    public interface IStudentService: IBaseService<Student>
    {
        Task<IEnumerable<StudentSubject>> GetSubjectsByStudentId(Guid studentId);
        Task<Student?> GetStudentByUserId(Guid userId);
        Task<Student?> NewStudent(StudentSaveDto newStudent);
    }
}
