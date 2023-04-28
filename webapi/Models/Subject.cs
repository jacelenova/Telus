using System.ComponentModel.DataAnnotations;
using webapi.Interfaces;

namespace webapi.Models
{
    public class Subject: IHasId
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
    }
}
