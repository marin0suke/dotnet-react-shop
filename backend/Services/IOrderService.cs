using DotnetReactShop.Models;

namespace DotnetReactShop.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(OrderSubmissionDto orderDto, string? userId = null);
        Task<OrderDto?> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(string userId); 

        Task<OrderDto> UpdateOrderAsync(int orderId, UpdateOrderDto updatedOrderDto, string userId); 
        Task DeleteOrderAsync(int orderId); 
    }
}

// declares any order must have method to create an order from an OrderSubmissionDto. 
// optional - accepts a userId to tie the order to a user.

