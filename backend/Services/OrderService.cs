
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
            var order = new Order // map dto to Order entity - 
            {
                UserId = userId,
                ShippingName = orderDto.ShippingName,
                ShippingAddress = orderDto.ShippingAddress,
                ShippingCity = orderDto.ShippingCity,
                ShippingPostalCode = orderDto.ShippingPostalCode,
                ShippingCountry = orderDto.ShippingCountry,
                OrderItems = orderDto.OrderItems.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    UnitPrice = item.UnitPrice,
                    Quantity = item.Quantity
                }).ToList()
            };

            order.CalculateTotal(); //update order.Total

            await _orderRepository.AddOrderAsync(order);
            return order;
        }
    }
}

// takes OrderSubmissionDto and maps its data to an Order domain entity. 