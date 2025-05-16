using DotnetReactShop.Models;
using DotnetReactShop.Services;
using DotnetReactShop.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using AutoMapper;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(
            UserManager<ApplicationUser> userManager, 
            IAuthService authService,
            IMapper mapper)
        {
            _userManager = userManager;
            _authService = authService;
            _mapper = mapper;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto model)
        {
            var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, "Retailer"); // assign role to user.
            var token = await _authService.GenerateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);

            var response = _mapper.Map<LoginResponseDto>(user);
            response.Token = token;
            response.Roles = roles.ToList();
            
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = await _authService.GenerateJwtToken(user);
                var roles = await _userManager.GetRolesAsync(user);

                var response = _mapper.Map<LoginResponseDto>(user);
                response.Token = token;
                response.Roles = roles.ToList();
                
                return Ok(response);
            }
            
            return Unauthorized("Invalid login attempt");
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetMe()
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

            var roles = await _userManager.GetRolesAsync(user);

            var response = _mapper.Map<UserDto>(user); 
            response.Roles = roles.ToList(); // populate roles property manually.
            
            return Ok(response);
        }
    }
}
