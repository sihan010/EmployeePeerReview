using EmployeePeerReview.Models.DTO.Review;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.API.Repository
{
    public interface IReviewRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> GetByEmployeeId(int id);
        IEnumerable<TEntity> GetByEmployeeIdFromPeer(int id);
        IEnumerable<ReviewPeers> GetByReviewFromPeer(int id);
        TEntity Get(int id);
        int Add(AddReview entity);
        void Update(TEntity dbEntity, UpdateReview entity);
    }
}
