// DotnetReactShop/Controllers/UserController.cs
using DotnetReactShop.DTOs;
using DotnetReactShop.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] 
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("retailers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var list = await _userService.GetAllUsersAsync();
            return Ok(list);
        }
    }
}