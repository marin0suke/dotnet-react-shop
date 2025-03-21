public class OrderDto
{
    public int Id { get; set; }
    public string ShippingName { get; set; }
    public string ShippingAddress { get; set; }
    public string ShippingCity { get; set; }
    public string ShippingPostalCode { get; set; }
    public string ShippingCountry { get; set; }
    public decimal Total { get; set; }
    public DateTime OrderDate { get; set; }
    public List<OrderItemDto> OrderItems { get; set; }
}