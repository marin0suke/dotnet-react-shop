
using DotnetReactShop.Models;

namespace DotnetReactShop.Repositories
{
    public interface IOrderRepository
    {
        Task AddOrderAsync(Order order);
        Task<Order?> GetOrderByIdAsync(int orderId);
        
        Task UpdateOrderAsync(Order updatedOrder); // no need by id since Order obj will have an order id in it. worth making an orderUpdateDto? (in this case this method would take the Dto as param)  

        Task DeleteOrderByIdAsync(int orderId);
    }
}