using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeePeerReview.Models;
using EmployeePeerReview.Models.DTO.Review;
using EmployeePeerReview.API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace EmployeePeerReview.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository<Review> _dataRepository;
        public ReviewController(IReviewRepository<Review> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        // GET: api/Review
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Review> reviews = _dataRepository.GetAll();
            return Ok(reviews);
        }
        // GET: api/Review/5
        [HttpGet("{id}", Name = "ReviewGet")]
        public IActionResult Get(int id)
        {
            Review review = _dataRepository.Get(id);
            if (review == null)
            {
                return NotFound("The Review record couldn't be found.");
            }
            return Ok(review);
        }
        // POST: api/Review
        [HttpPost]
        public IActionResult Post([FromBody] AddReview review)
        {
            if (review == null)
            {
                return BadRequest("Review is null.");
            }
            int id = _dataRepository.Add(review);
            if (id == -1) return BadRequest();
            return CreatedAtRoute(
                  "ReviewGet",
                  new { Id = id },
                  review);
        }
        // PUT: api/Review/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UpdateReview review)
        {
            if (review == null)
            {
                return BadRequest("Review is null.");
            }
            Review reviewToUpdate = _dataRepository.Get(id);
            if (reviewToUpdate == null)
            {
                return NotFound("The Review record couldn't be found.");
            }
            _dataRepository.Update(reviewToUpdate, review);
            return NoContent();
        }

        [HttpGet]
        [Route("GetByEmployee/{id}")]
        public IActionResult GetByEmployee(int id)
        {
            var reviews = _dataRepository.GetByEmployeeId(id);
            return Ok(reviews);
        }

        [HttpGet]
        [Route("GetByEmployeeFromPeer/{id}")]
        public IActionResult GetByEmployeeFromPeer(int id)
        {
            var reviews = _dataRepository.GetByEmployeeIdFromPeer(id);
            return Ok(reviews);
        }

        [HttpGet]
        [Route("GetByReviewFromPeer/{id}")]
        public IActionResult GetByReviewFromPeer(int id)
        {
            var reviews = _dataRepository.GetByReviewFromPeer(id);
            return Ok(reviews);
        }
    }
}