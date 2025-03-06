
using DotnetReactShop.Models;

namespace DotnetReactShop.Services
{
    public interface IAuthService
    {
        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}