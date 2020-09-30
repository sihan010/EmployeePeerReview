using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.Models
{
    public class Peer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Comment { get; set; }
        public int EmployeeId { get; set; }
        public int ReviewId { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual Review Review { get; set; }

    }
}
