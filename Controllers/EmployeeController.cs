using EmployeePeerReview.API.Repository;
using EmployeePeerReview.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace EmployeePeerReview.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository<Employee> _dataRepository;
        public EmployeeController(IEmployeeRepository<Employee> dataRepository)
        {
            _dataRepository = dataRepository;
 
        }
        // GET: api/Employee
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Employee> employees = _dataRepository.GetAll();

            return Ok(employees);
            
        }
        // GET: api/Employee/5
        [HttpGet("{id}",Name = "EmployeeGet")]
        public IActionResult Get(int id)
        {
            Employee employee = _dataRepository.Get(id);
            if (employee == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            return Ok(employee);
        }
        // POST: api/Employee
        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee is null.");
            }
            int id = _dataRepository.Add(employee);
            return CreatedAtRoute(
                  "EmployeeGet",
                  new { Id = id },
                  employee);
        }
        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee is null.");
            }
            Employee employeeToUpdate = _dataRepository.Get(id);
            if (employeeToUpdate == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            _dataRepository.Update(employeeToUpdate, employee);
            return Ok(new { success=true});
        }
        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Employee employee = _dataRepository.Get(id);
            if (employee == null)
            {
                return NotFound("The Employee record couldn't be found.");
            }
            int res = _dataRepository.Delete(employee);
            if (res == 1) {
                return Ok(new { success = true });
            }
            else
            {
                return BadRequest(new { success = false });
            }
        }
    }
}