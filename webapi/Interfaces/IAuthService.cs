using webapi.Models;

namespace webapi.Interfaces
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        Task<User?> GetUser(string username, string password);
    }
}
