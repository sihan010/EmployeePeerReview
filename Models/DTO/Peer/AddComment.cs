using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.Models.DTO.Peer
{
    public class AddComment
    {
        public int EmployeeId { get; set; }
        public int ReviewId { get; set; }
        public string Comment { get; set; }
    }
}
