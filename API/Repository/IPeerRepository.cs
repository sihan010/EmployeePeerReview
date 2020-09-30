using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.API.Repository
{
    public interface IPeerRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity Get(int id);
        int Add(TEntity entity);

        void AddComment(int employeeId, int reviewId, string comment);
    }
}
