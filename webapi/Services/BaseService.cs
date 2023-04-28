using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using webapi.Interfaces;
using webapi.Models;

namespace webapi.Services
{
    public abstract class BaseService<T> where T : class, IHasId
    {
        protected readonly ApplicationDbContext _context;

        public BaseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<T?> GetById(Guid Id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> IncludeMultiple(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _context.Set<T>();
            if (includes != null)
            {
                query = includes.Aggregate(query,
                          (current, include) => current.Include(include));
            }

            return await query.ToListAsync();
        }

        public async Task<T> Add(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> Delete(Guid Id)
        {
            var res = await GetById(Id);
            if (res != null)
            {
                _context.Set<T>().Remove(res);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
