// File: Services/UserService.cs
using DotnetReactShop.DTOs;
using DotnetReactShop.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DotnetReactShop.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // Rename this to “GetAllUsersAsync” if you like, but here we'll keep the same name for minimal changes:
        public async Task<IEnumerable<UserSummaryDto>> GetAllUsersAsync()
        {
            // 1) Load every user from AspNetUsers
            var allUsers = await _userManager.Users.ToListAsync();

            var result = new List<UserSummaryDto>();

            // 2) For each user, grab their roles (even if empty), then map to UserSummaryDto
            foreach (var user in allUsers)
            {
                var roles = await _userManager.GetRolesAsync(user);

                result.Add(new UserSummaryDto
                {
                    Id = user.Id,
                    Email = user.Email!,
                    Roles = roles
                });
            }

            return result;
        }
    }
}