using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class StudentSaveDto
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; } = string.Empty;
    }
}
