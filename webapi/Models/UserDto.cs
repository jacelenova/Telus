using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class UserDto
    {
        public UserDto(User user)
        {
            Id = user.Id;
            EmailAddress = user.EmailAddress;
            FirstName = user.FirstName;
            LastName = user.LastName;
            Role = user.Role;
        }

        public UserDto() { }

        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public string EmailAddress { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public Role Role { get; set; }
    }
}
