using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public UserService(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor) : base(context)
        {
            _contextAccessor = httpContextAccessor;
        }

        public async Task<User?> GetCurrentUser()
        {
            User? result = null;
            var userId = _contextAccessor?.HttpContext?.User?.FindFirst("UserId")?.Value;
            if (userId != null)
            {
                result = await GetById(Guid.Parse(userId));
            }

            return result;
        }
    }
}
