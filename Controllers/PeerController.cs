using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeePeerReview.Models;
using EmployeePeerReview.API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EmployeePeerReview.Models.DTO.Peer;
using Microsoft.AspNetCore.Authorization;

namespace EmployeePeerReview.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PeerController : ControllerBase
    {
        private readonly IPeerRepository<Peer> _dataRepository;
        public PeerController(IPeerRepository<Peer> dataRepository)
        {
            _dataRepository = dataRepository;
        }
        // GET: api/Peer
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Peer> peer = _dataRepository.GetAll();
            return Ok(peer);
        }
        // GET: api/Peer/5
        [HttpGet("{id}",Name ="PeerGet")]
        public IActionResult Get(int id)
        {
            Peer peer = _dataRepository.Get(id);
            if (peer == null)
            {
                return NotFound("The Peer record couldn't be found.");
            }
            return Ok(peer);
        }
        // POST: api/Peer
        [HttpPost]
        public IActionResult Post([FromBody] Peer peer)
        {
            if (peer == null)
            {
                return BadRequest("Peer is null.");
            }
            int id = _dataRepository.Add(peer);
            return CreatedAtRoute(
                  "PeerGet",
                  new { Id = id },
                  peer);
        }
        [HttpPut]
        public IActionResult Put([FromBody] AddComment param)
        {
            if (param == null)
            {
                return BadRequest("Peer is null.");
            }
            _dataRepository.AddComment(param.EmployeeId,param.ReviewId,param.Comment);
            return Ok(new { Success = true });
        }
    }
}