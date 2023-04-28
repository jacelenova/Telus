using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public class SubjectService : BaseService<Subject>, ISubjectService
    {
        public SubjectService(ApplicationDbContext _context) : base(_context) { }
    }
}
