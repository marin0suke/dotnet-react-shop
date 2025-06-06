
public class OrderItemDto
{
    public int ProductId { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    // public string ProductName { get; set; } = string.Empty; // for showing prod name in Admin Orders view.
    // public decimal Subtotal { get; set; } // for sub total for each item - leave for later.
}