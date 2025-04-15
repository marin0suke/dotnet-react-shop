using DotnetReactShop.Models;

namespace DotnetReactShop.DTOs
{
    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartResponseDTO
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }

        public static CartResponseDTO FromCartItem(CartItem cartItem)
        {
            return new CartResponseDTO
            {
                Id = cartItem.Id,
                ProductId = cartItem.ProductId,
                ProductName = cartItem.Product.Name,
                ProductPrice = cartItem.Product.Price,
                Quantity = cartItem.Quantity,
                ImageUrl = cartItem.Product.ImageUrl
            };
        }
    }
} 