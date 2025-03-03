using Microsoft.AspNetCore.Mvc;
using DotnetReactShop.Models;
using DotnetReactShop.Services;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService) // ctor
        {
            _productService = productService;
        }

        // get api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _productService.GetProductAsync(id);
            if (product == null) 
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product newProduct)
        {
            await _productService.CreateProductAsync(newProduct);
            return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct); // returns 201 created response. + location header.
            // nameof(Get) refers to get method that retrieves product by id.
            // new { id = newProduct.Id } supplies the route values for that action.
            // newProduct is the returned object. 
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Put(int id, Product updatedProduct) 
        {
            await _productService.UpdateProductAsync(id, updatedProduct);
            return NoContent(); // we assume service handles correctly. validation will 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}

// controller interacts only with IProductService instance.
// get requests - get for existence. bc client needs to be informed if resource doesn't exist.
// put/del requests - ideally service to keep controller thin, but try catch can be used to make sure correct response is output to client. 