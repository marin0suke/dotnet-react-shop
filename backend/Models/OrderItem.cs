
namespace DotnetReactShop.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order? Order { get; set; } // foreign key to the order aggregate .. ?

        public int ProductId { get; set; } // snapshot data
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }

        public decimal Subtotal => UnitPrice * Quantity; // calced prop (subtotal for item)
    }
}