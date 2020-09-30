using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EmployeePeerReview.Models;
using EmployeePeerReview.Models.DTO.Auth;
using EmployeePeerReview.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EmployeePeerReview.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody]Login param)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(param);
            if (user != null)
            {
                var token = GenerateJSONWebToken(user);
                return Ok(new { token, user });

            }
            else return response;
        }

        [HttpPost]
        [Authorize]
        public IActionResult ValidateToken()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId!=null && userId!="")
            {
                try
                {
                    var existingUser = _context.Employees.FirstOrDefault(e => e.Id == Convert.ToInt32(userId));
                    if (existingUser != null)
                    {
                        return Ok(existingUser);
                    }
                    return Unauthorized();
                }
                catch (Exception ex)
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
            
        }

        private string GenerateJSONWebToken(Employee user)
        {
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Typ, user.EmployeeType),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Name),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Nbf, DateTime.Now.ToString()),
                new Claim(JwtRegisteredClaimNames.AuthTime, DateTime.Now.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials
            );
            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }

        private Employee Authenticate(Login param)
        {
            try
            {
                var existingUser = _context.Employees.FirstOrDefault(e => e.Email == param.Email);
                if (existingUser != null)
                {
                    if (PasswordHashUtility.ValidatePassword(param.Password,existingUser.Password))
                    {
                        return existingUser;
                    }
                    else
                    {
                        return null;
                    }
                }
                else return existingUser;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}