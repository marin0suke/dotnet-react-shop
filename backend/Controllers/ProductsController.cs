using Microsoft.AspNetCore.Mvc;
using DotnetReactShop.Models;
using System.Collections.Generic; 
using System.Linq;

namespace DotnetReactShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // static list to sim a data store.
        private static readonly List<Product> Products = new List<Product>
        {
            new Product {
                Id = 1,
                Name = "Sample Product",
                Description = "This is a sample prod",
                Price = 9.99m,
                ImageUrl = "https://via.placeholder.com/600x400"
            }
        };

        // get api/products
        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get()
        {
            return Ok(Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null) 
                return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> Post(Product newProduct)
        {
            newProduct.Id = Products.Any() ? Products.Max(p => p.Id) + 1 : 1;
            Products.Add(newProduct);
            return CreatedAtAction(nameof(Get), new { id = newProduct.Id }, newProduct); // returns 201 created response. + location header.
            // nameof(Get) refers to get method that retrieves product by id.
            // new { id = newProduct.Id } supplies the route values for that action.
            // newProduct is the returned object. 
        }

        [HttpPut("{id}")] 
        public ActionResult<Product> Put(int id, Product updatedProduct) 
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)  
                return NotFound();
            
            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.ImageUrl = updatedProduct.ImageUrl;

            return NoContent(); // 204 success but no content to send in response body.
        }
    }
}