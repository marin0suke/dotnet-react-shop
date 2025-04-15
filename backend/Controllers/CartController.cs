using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotnetReactShop.Data;
using DotnetReactShop.Models;
using DotnetReactShop.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartResponseDTO>>> GetCart()
        {
            var userId = GetUserId();
            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .Select(c => CartResponseDTO.FromCartItem(c))
                .ToListAsync();

            return Ok(cartItems);
        }

        [HttpPost]
        public async Task<ActionResult<CartResponseDTO>> AddToCart([FromBody] CartItemDTO cartItem)
        {
            var userId = GetUserId();
            var existingItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == cartItem.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += cartItem.Quantity;
                existingItem.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                var newCartItem = new CartItem
                {
                    UserId = userId,
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity
                };
                _context.CartItems.Add(newCartItem);
            }

            await _context.SaveChangesAsync();

            var updatedItem = await _context.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == cartItem.ProductId);

            return Ok(CartResponseDTO.FromCartItem(updatedItem));
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult<CartResponseDTO>> UpdateCartItem(int productId, [FromBody] CartItemDTO cartItem)
        {
            var userId = GetUserId();
            var existingItem = await _context.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Quantity = cartItem.Quantity;
            existingItem.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(CartResponseDTO.FromCartItem(existingItem));
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFromCart(int productId)
        {
            var userId = GetUserId();
            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            var cartItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .ToListAsync();

            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
} 