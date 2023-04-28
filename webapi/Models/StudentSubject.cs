using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using webapi.Interfaces;

namespace webapi.Models
{
    public class StudentSubject: IHasId
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [ForeignKey("Student")]
        public Guid StudentId { get; set; }
        [Required]
        [ForeignKey("Subject")]
        public Guid SubjectId { get; set; }
        public decimal Grade { get; set; }

        public Student Student { get; set; }
        public Subject Subject { get; set; }
    }
}
