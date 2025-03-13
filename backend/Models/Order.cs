
using Stripe;

namespace DotnetReactShop.Models
{
    public class Order
    {
        public int Id { get; set; } // primary key

        public string UserId { get; set; } // ref to user (if possible?)
        public ApplicationUser? User { get; set; } // optional nav property

        public string ShippingName { get; set; }
        public string ShippingAddress { get; set; }
        public string ShippingCity { get; set; }
        public string ShippingPostalCode { get; set; }
        public string ShippingCountry { get; set; }

        public decimal Total { get; set; }
        public DateTime OrderDate { get; set; }

        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        public void CalculateTotal()
        {
            Total = OrderItems.Sum(item => item.UnitPrice * item.Quantity);
        }
    }
}