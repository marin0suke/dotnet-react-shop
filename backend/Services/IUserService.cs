using DotnetReactShop.DTOs;

namespace DotnetReactShop.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserSummaryDto>> GetAllUsersAsync();
    }
}