

using System.Security.Claims;
using DotnetReactShop.Models;
using DotnetReactShop.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // only authed users can access these endpoints.
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("submit")] // submit a new order.
        public async Task<IActionResult> SubmitOrder([FromBody] OrderSubmissionDto orderDto)
        {
            if (orderDto == null || orderDto.OrderItems.Count == 0) // check order exists and has items.
            {
                return BadRequest("Order must container at least one item");
            } 

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; //checks that order is associated with a user.
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found");
            }

            try
            {
                var orderId = await _orderService.CreateOrderAsync(orderDto, userId);
                return CreatedAtAction(nameof(GetOrderById), new { id = orderId }, new { orderId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found");
            }
            return Ok(order);
        }

        [HttpGet("my-orders")]
        public async Task<IActionResult> GetUserOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // User is post auth ClaimType so we can access Identity methods and properties.
            if (string.IsNullOrEmpty(userId)) // == only checks for null, but not "". use == only when allowing for empty strings specifically.
            {
                return Unauthorized("User ID not found");
            }
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("all-orders")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {
                var allOrders = await _orderService.GetAllOrdersAsync();
                return Ok(allOrders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching orders: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            await _orderService.DeleteOrderAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] UpdateOrderDto updatedOrderDto)
        {
            if (updatedOrderDto == null || id != updatedOrderDto.Id)
            {
                return BadRequest("Invalid order data");
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found");
            }

            try
            {
                var updatedOrder = await _orderService.UpdateOrderAsync(id, updatedOrderDto, userId);
                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}