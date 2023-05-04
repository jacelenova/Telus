using webapi.Models;

namespace webapi.Interfaces
{
    public interface IUserService : IBaseService<User>
    {
        Task<User?> GetCurrentUser();
    }
}
