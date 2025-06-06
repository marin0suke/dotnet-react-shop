
using DotnetReactShop.Models;

namespace DotnetReactShop.Repositories
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
        
        Task UpdateOrderAsync(Order updatedOrder); // no need by id since Order obj will have an order id in it. worth making an orderUpdateDto? (in this case this method would take the Dto as param)  

        Task DeleteOrderAsync(int orderId);

        Task<IEnumerable<Order>> GetAllOrdersAsync(); // for admin orders page.
    }
}