
public class OrderSubmissionDto
{
    //shipping details 
    public string ShippingName { get; set; }
    public string ShippingAddress { get; set; }
    public string ShippingCity { get; set; }
    public string ShippingPostalCode { get; set; }
    public string ShippingCountry { get; set; }

    public List<OrderItemDto> OrderItems { get; set; }
}