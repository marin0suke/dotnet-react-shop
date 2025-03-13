
using DotnetReactShop.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CheckoutSessionCreateModelDto model)
        {
            var sessionId = await _paymentService.CreateCheckoutSessionAsync(model); // delegate to service to create session.
            return Ok(new { sessionId }); // returns the id.
        }
    }
}

