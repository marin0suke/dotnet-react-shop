
using DotnetReactShop.Models;

namespace DotnetReactShop.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(OrderSubmissionDto orderDto, string userId = null);
        Task<Order> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId); 

        Task UpdateOrderAsync(Order updatedOrder); 
        Task DeleteOrderAsync(int orderId); 
    }
}

// declares any order must have method to create an order from an OrderSubmissionDto. 
// optional - accepts a userId to tie the order to a user.

