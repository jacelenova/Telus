using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class StudentDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public List<Subject> Subjects { get; set; } = new List<Subject>();
    }
}
