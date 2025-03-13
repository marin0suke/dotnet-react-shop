
namespace DotnetReactShop.Services
{
    public interface IPaymentService
    {
        Task<string> CreateCheckoutSessionAsync(CheckoutSessionCreateModelDto model);
    }
}