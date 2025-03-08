
namespace DotnetReactShop.Services
{
    public interface IPaymentService
    {
        Task<string> CreateCheckoutSessionAsync(CheckoutSessionCreateModel model);
    } 
}