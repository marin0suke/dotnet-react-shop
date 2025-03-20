
using DotnetReactShop.Models;
using DotnetReactShop.Repositories;

namespace DotnetReactShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository; // is this a dependency? this is here since OrderService is responsible for creating an instance of the repository upon order submission?

        public OrderService(IOrderRepository orderRepository) // constructor of OrderService class and expected param.
        {
            _orderRepository = orderRepository; // DI container initialises the instance of repository? and so we can just attach it to OrderService here.
        }

        public async Task<Order> CreateOrderAsync(OrderSubmissionDto orderDto, string userId = null)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new Exception("User must be logged in to place an order");
            }

            try {
                var order = new Order // map dto to Order entity - 
            {
                UserId = userId,
                ShippingName = orderDto.ShippingName,
                ShippingAddress = orderDto.ShippingAddress,
                ShippingCity = orderDto.ShippingCity,
                ShippingPostalCode = orderDto.ShippingPostalCode,
                ShippingCountry = orderDto.ShippingCountry,
                OrderItems = new List<OrderItem>() // init empty list first - create empty order with Id first.
            };

            await _orderRepository.AddOrderAsync(order);

            order.OrderItems = orderDto.OrderItems.Select(item => new OrderItem
            {
                OrderId = order.Id, // orderItems have an orderId (!)
                ProductId = item.ProductId,
                ProductName = item.ProductName,
                UnitPrice = item.UnitPrice,
                Quantity = item.Quantity
            }).ToList();

            await _orderRepository.UpdateOrderAsync(order);
            return order;

            } 
            catch (Exception ex)
            {
                throw new Exception($"Failed to create order: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            return await _orderRepository.GetOrderByIdAsync(orderId);
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
        {
            return await _orderRepository.GetOrdersByUserIdAsync(userId);
        }

        public async Task UpdateOrderAsync(Order updatedOrder)
        {
            await _orderRepository.UpdateOrderAsync(updatedOrder);
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            await _orderRepository.DeleteOrderAsync(orderId);
        }
    }
}

// takes OrderSubmissionDto and maps its data to an Order domain entity. 