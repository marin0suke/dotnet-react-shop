
using DotnetReactShop.Models;

namespace DotnetReactShop.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(OrderSubmissionDto orderDto, string userId = null);
    }
}

// declares any order must have method to create an order from an OrderSubmissionDto. 
// optional - accepts a userId to tie the order to a user.

