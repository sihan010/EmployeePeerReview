using EmployeePeerReview.API.Repository;
using EmployeePeerReview.Models;
using EmployeePeerReview.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeePeerReview.API.DataManager
{
    public class EmployeeManager : IEmployeeRepository<Employee>
    {
        private readonly DataContext _context;
        public EmployeeManager(DataContext context)
        {
            _context = context;
        }
        public int Add(Employee entity)
        {
            entity.Password = PasswordHashUtility.HashString(entity.Password);
            _context.Employees.Add(entity);
            _context.SaveChanges();
            return entity.Id;
        }

        public int Delete(Employee entity)
        {
            try
            {
                _context.Employees.Remove(entity);
                _context.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public Employee Get(int id)
        {
            return _context.Employees.FirstOrDefault(e => e.Id == id);
        }

        public Employee GetWithReviews(int id)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Id == id);
            var reviews = _context.Reviews.Where(r => r.Employee.Id == employee.Id).ToList();
            employee.Reviews = reviews;
            return employee;
        }

        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees.ToList();
        }

        public void Update(Employee dbEntity, Employee entity)
        {
            dbEntity.Email = entity.Email;
            dbEntity.Password = PasswordHashUtility.HashString(entity.Password);
            dbEntity.EmployeeType = entity.EmployeeType;
            dbEntity.Name = entity.Name;
            dbEntity.Position = entity.Position;

            _context.SaveChanges();
        }
    }
}
