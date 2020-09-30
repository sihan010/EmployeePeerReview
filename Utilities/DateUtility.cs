using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.Utilities
{
    public static class DateUtility
    {
        public static string SqlFormattedDateTime()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss.fff");
        }
    }
}
