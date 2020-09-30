using EmployeePeerReview.Models;
using EmployeePeerReview.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
                : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Peer> Peers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(new Employee
            {
                Id=1,
                Email = "admin@paypay.com",
                Password = PasswordHashUtility.HashString("abc123"),
                EmployeeType = "Admin",
                Name = "Bob",
                Position = "Manager"
            }, new Employee
            {
                Id = 2,
                Email = "user@paypay.com",
                Password = PasswordHashUtility.HashString("abc123"),
                EmployeeType = "General",
                Name = "John",
                Position = "Developer"
            });
        }
    }
}
