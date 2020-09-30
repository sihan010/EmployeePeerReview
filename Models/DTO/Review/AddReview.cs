using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.Models.DTO.Review
{
    public class AddReview
    {
        public string Content { get; set; }
        public string Month { get; set; }
        public int EmployeeId { get; set; }
        public int[] Peers { get; set; }
    }
}
