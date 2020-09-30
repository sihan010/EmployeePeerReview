using EmployeePeerReview.Models.DTO.Review;
using EmployeePeerReview.API.Repository;
using EmployeePeerReview.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeePeerReview.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeePeerReview.API.DataManager
{
    public class ReviewManager : IReviewRepository<Review>
    {
        private readonly DataContext _context;
        public ReviewManager(DataContext context)
        {
            _context = context;
        }
        public int Add(AddReview review)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == review.EmployeeId);
            if (employee == null) return -1;
            var entity = new Review()
            {
                Content = review.Content,
                Month = review.Month,
                Date = DateUtility.SqlFormattedDateTime(),
                Employee = employee
            };
            _context.Reviews.Add(entity);
              
            foreach(var peerId in review.Peers)
            {
                var peer = _context.Employees.FirstOrDefault(e => e.Id == peerId);
                var peerEntry = new Peer()
                {
                    Comment = "",
                    Review = entity,
                    Employee = peer
                };
                _context.Peers.Add(peerEntry);
            }
            _context.SaveChanges();
            return entity.Id;
        }

        public Review Get(int id)
        {
            return _context.Reviews.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<Review> GetAll()
        {
            return _context.Reviews.ToList();
        }

        public IEnumerable<Review> GetByEmployeeId(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
            return _context.Reviews.Where(r => r.Employee == employee).ToList();
        }

        public IEnumerable<Review> GetByEmployeeIdFromPeer(int id)
        {
            var res = new List<Review>() { };
            var peers= _context.Peers.FromSqlRaw($"SELECT * FROM dbo.Peers WHERE EmployeeId={id}").ToList();
            foreach(var peer in peers)
            {
                var review = _context.Reviews.FirstOrDefault(r => r.Id == peer.ReviewId);
                var emp = _context.Employees.FirstOrDefault(e => e.Id == review.EmployeeId);
                review.Employee = emp;
                res.Add(review);
            }
            return res;
        }

        public IEnumerable<ReviewPeers> GetByReviewFromPeer(int id)
        {
            var res = new List<ReviewPeers>() { };
            var peers = _context.Peers.FromSqlRaw($"SELECT * FROM dbo.Peers WHERE ReviewId={id}").ToList();
            foreach (var peer in peers)
            {
                
                var emp = _context.Employees.FirstOrDefault(e => e.Id == peer.EmployeeId);

                var rp = new ReviewPeers { Comment = peer.Comment, EmployeeName = emp.Name };
                res.Add(rp);
            }
            return res;
        }

        public void Update(Review dbEntity, UpdateReview entity)
        {
            dbEntity.Content = entity.Content;
            dbEntity.Month = entity.Month;
            dbEntity.Date = DateUtility.SqlFormattedDateTime();

            _context.SaveChanges();
        }
    }
}
