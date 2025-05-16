using Microsoft.AspNetCore.Identity;
using DotnetReactShop.Models;
using Microsoft.Extensions.Logging;

namespace DotnetReactShop.Data
{
    public class AdminUserSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AdminUserSeeder> _logger;

        public AdminUserSeeder(
            UserManager<ApplicationUser> userManager,
            ILogger<AdminUserSeeder> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        public async Task SeedAdminUserAsync()
        {
            var adminEmail = "admin@example.com";
            var adminName = "TestAdmin";
            var adminUser = await _userManager.FindByEmailAsync(adminEmail);

            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminName,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(adminUser, "Admin123!@#"); // Stronger password that meets requirements

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(adminUser, "Admin");
                    _logger.LogInformation("Admin user created successfully");
                }
                else
                {
                    _logger.LogError("Failed to create admin user: {Errors}", 
                        string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
            else
            {
                _logger.LogInformation("Admin user already exists");
            }
        }

        public async Task DeleteAdminUserAsync()
        {
            var adminEmail = "admin@example.com";
            var adminUser = await _userManager.FindByEmailAsync(adminEmail);

            if (adminUser != null)
            {
                var result = await _userManager.DeleteAsync(adminUser);

                if (result.Succeeded)
                {
                    _logger.LogInformation("Deleted existing admin user.");
                }
                else
                {
                    _logger.LogError("Failed to delete admin user: {Errors}",
                        string.Join(", ", result.Errors.Select(e => e.Description)));
                }
            }
            else
            {
                _logger.LogInformation("No admin user found to delete.");
            }
        }
    }
} 