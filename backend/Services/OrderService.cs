using AutoMapper;
using DotnetReactShop.Models;
using DotnetReactShop.Repositories;

namespace DotnetReactShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository; // is this a dependency? this is here since OrderService is responsible for creating an instance of the repository upon order submission?
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper) // constructor of OrderService class and expected param.
        {
            _orderRepository = orderRepository; // DI container initialises the instance of repository? and so we can just attach it to OrderService here.
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(OrderSubmissionDto orderDto, string? userId = null)
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new Exception("User must be logged in to place an order");
            }

            try 
            {
                var order = _mapper.Map<Order>(orderDto); 
                order.UserId = userId; // manually map the UserId to the order (UserId is from JWT and we dont want it in the Submissiondto)
                order.OrderDate = DateTime.UtcNow; // manual set instead of setting in db. db agnostic = cleaner.

                await _orderRepository.AddOrderAsync(order); // we have the entity, create an order with it.

                var submitOrderResponse = _mapper.Map<OrderDto>(order); // map it back to return response. (returned back to frontend to display/confirm order)
                return submitOrderResponse;
            } 
            catch (Exception ex)
            {
                throw new Exception($"Failed to create order: {ex.InnerException?.Message ?? ex.Message}");
            }
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null) return null;

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(string userId)
        {
            var userOrders = await _orderRepository.GetOrdersByUserIdAsync(userId);
            return _mapper.Map<List<OrderDto>>(userOrders);
        }

        public async Task<OrderDto> UpdateOrderAsync(int orderId, UpdateOrderDto updatedOrderDto, string userId)
        {
            var existingOrder = await _orderRepository.GetOrderByIdAsync(orderId); // grab old order by id
            if (existingOrder == null || existingOrder.UserId != userId) //validate
            {
                throw new Exception("Order not found or user not authorised to update this order.");
            } 

            _mapper.Map(updatedOrderDto, existingOrder); // update existing with properties from updateorderdto.
            await _orderRepository.UpdateOrderAsync(existingOrder);

            return _mapper.Map<OrderDto>(existingOrder); 
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            await _orderRepository.DeleteOrderAsync(orderId);
        }
    }
}

// takes OrderSubmissionDto and maps its data to an Order domain entity. 