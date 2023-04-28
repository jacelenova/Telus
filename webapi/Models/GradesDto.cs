namespace webapi.Models
{
    public class GradesDto
    {
        public Guid SubjectId { get; set; }
        public string SubjectName { get; set; } = string.Empty;
        public decimal Grade { get; set; }
    }
}
