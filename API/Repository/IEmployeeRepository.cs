using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.API.Repository
{
    public interface IEmployeeRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(int id);
        TEntity GetWithReviews(int id);
        int Add(TEntity entity);
        void Update(TEntity dbEntity, TEntity entity);
        int Delete(TEntity entity);
    }
}
