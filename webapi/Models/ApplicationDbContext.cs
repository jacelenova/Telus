using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<StudentSubject> StudentSubjects { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<User> Users { get; set; }

        //protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseInMemoryDatabase(databaseName: "MyDB");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subject>().HasData(
                new Subject
                {
                    Id = Guid.Parse("8f1d0ba4-9583-4822-9aa6-a2378fa98efd"),
                    Name = "Math"
                },
                new Subject
                {
                    Id = Guid.Parse("5bcabba0-5908-4a2d-8648-688e15f681a1"),
                    Name = "Science"
                },
                new Subject
                {
                    Id = Guid.Parse("f8474475-52e6-4cea-b445-0c5aa40cab1c"),
                    Name = "History"
                }
            );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.Parse("8e039620-d0a2-4cdc-b55c-57a0c35b9577"),
                    FirstName = "Admin",
                    LastName = "Admin",
                    EmailAddress = "admin@admin",
                    Password = "1",
                    Role = Role.Admin
                },
                new User
                {
                    Id = Guid.Parse("875d9094-765b-45ba-a871-e7fe3b1544be"),
                    FirstName = "Steph",
                    LastName = "Curry",
                    EmailAddress = "steph@warriors",
                    Password = "2",
                    Role = Role.Student
                }
            );

            modelBuilder.Entity<Student>().HasData(
                new Student
                {
                    Id = Guid.Parse("8413b922-090a-42c3-99dd-fb76f3e8a405"),
                    UserId = Guid.Parse("875d9094-765b-45ba-a871-e7fe3b1544be")
                }
             );

            modelBuilder.Entity<StudentSubject>().HasData(
                new StudentSubject
                {
                    Id = Guid.NewGuid(),
                    StudentId = Guid.Parse("8413b922-090a-42c3-99dd-fb76f3e8a405"),
                    SubjectId = Guid.Parse("8f1d0ba4-9583-4822-9aa6-a2378fa98efd"),
                    Grade = 90
                }
            );
        }
    }
}
