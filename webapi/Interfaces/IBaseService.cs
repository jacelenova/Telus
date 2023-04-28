using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace webapi.Interfaces
{
    public interface IBaseService<T>
    {
        Task<T?> GetById(Guid Id);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> IncludeMultiple(params Expression<Func<T, object>>[] includes);
        Task<T> Add(T entity);
        Task<bool> Delete(Guid Id);
    }
}
