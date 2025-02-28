using Microsoft.AspNetCore.Mvc;
using DotnetReactShop.Models;
using System.Collections.Generic; 
using System.Linq;
using DotnetReactShop.Data;
using Microsoft.EntityFrameworkCore;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context; // assigned context cant be changed, ensures consistent use of same db context instance (throughout its lifetime).

        public ProductsController(AppDbContext context) // ctor
        {
            _context = context;
        }

        // get api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) 
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Post(Product newProduct)
        {
            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct); // returns 201 created response. + location header.
            // nameof(Get) refers to get method that retrieves product by id.
            // new { id = newProduct.Id } supplies the route values for that action.
            // newProduct is the returned object. 
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> Put(int id, Product updatedProduct) 
        {
            if (id != updatedProduct.Id)
                return BadRequest();

            _context.Entry(updatedProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (await _context.Products.FindAsync(id) == null)
                    return NotFound();
                else
                    throw;
            }

            return NoContent(); // 204 success but no content to send in response body.
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}