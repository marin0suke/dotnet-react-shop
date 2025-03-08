

using Stripe.Checkout;

namespace DotnetReactShop.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;

        public PaymentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> CreateCheckoutSessionAsync(CheckoutSessionCreateModel model)
        {
            Stripe.StripeConfiguration.ApiKey = _configuration.GetValue<string>("Stripe:SecretKey");
            
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "payment",
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = model.ProductName,
                            },
                            UnitAmount  = (long)(model.Amount * 100), // stripe uses cents
                        },
                        Quantity = 1,
                    },
                },
                SuccessUrl = _configuration.GetValue<string>("Stripe:SuccessUrl"),
                CancelUrl = _configuration.GetValue<string>("Stripe:CancelUrl"),
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return session.Id;
        }
    }
}