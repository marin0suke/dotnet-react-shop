using DotnetReactShop.Models;
using DotnetReactShop.Services;
using DotnetReactShop.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _authService;

        public AuthController(UserManager<ApplicationUser> userManager, IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
        {
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, "Retailer"); // assign role to user.

            var token = await _authService.GenerateJwtToken(user);

            var roles = await _userManager.GetRolesAsync(user); // grab role for user.

            var response = new LoginResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Roles = roles.ToList(),
                Token = token
            };
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = await _authService.GenerateJwtToken(user);

                var response = _mapper.Map<LoginResponseDto>(user);
                response.Token = token; 
                return Ok(response);
            }
            
            return Unauthorized("Invalid login attempt");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<MeResponseDto>> GetMe()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var meDto = _mapper.Map<MeResponseDto>(user);

            var roles = await _userManager.GetRolesAsync(user); // populate roles property manually.
            meDto.Roles = roles.ToList();
            
            return Ok(meDto);
        }
    }
}
