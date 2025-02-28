using Microsoft.AspNetCore.Mvc;
using DotnetReactShop.Models;
 
namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // a sample GET endpoint
        [HttpGet]
        public IActionResult Get()
        {
            var sampleProduct = new Product
            {
                Id = 1,
                Name = "Sample Product",
                Description = "This is a sample prod",
                Price = 9.99m,
                ImageUrl = ""
            };

            return Ok(new[] { sampleProduct });
        }
    }
}