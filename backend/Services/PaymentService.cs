

using DotnetReactShop.Data;
using Microsoft.EntityFrameworkCore;
using Stripe.Checkout;

namespace DotnetReactShop.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _dbContext;

        public PaymentService(IConfiguration configuration, AppDbContext dbContext)
        {
            _configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<string> CreateCheckoutSessionAsync(CheckoutSessionCreateModelDto model)
        {
            Stripe.StripeConfiguration.ApiKey = _configuration.GetValue<string>("Stripe:SecretKey");

            var product = await _dbContext.Products
                .Where(p => p.Id == model.ProductId)
                .Select(p => new { p.Name })
                .FirstOrDefaultAsync();

            if (product is null)
                throw new InvalidOperationException($"Product ID {model.ProductId} not found.");

            var options = new SessionCreateOptions // manual mapping? 
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