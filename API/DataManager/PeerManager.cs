using EmployeePeerReview.API.Repository;
using EmployeePeerReview.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.API.DataManager
{
    public class PeerManager : IPeerRepository<Peer>
    {
        private readonly DataContext _context;
        public PeerManager(DataContext context)
        {
            _context = context;
        }
        public int Add(Peer entity)
        {
            _context.Peers.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public void AddComment(int employeeId, int reviewId, string comment)
        {
            var peer = _context.Peers.FirstOrDefault(p => p.EmployeeId == employeeId && p.ReviewId == reviewId);
            peer.Comment = comment;
            _context.SaveChanges();

        }

        public Peer Get(int id)
        {
            return _context.Peers.FirstOrDefault(e => e.Id == id);
        }

        public IEnumerable<Peer> GetAll()
        {
            return _context.Peers.ToList();
        }
    }
}
