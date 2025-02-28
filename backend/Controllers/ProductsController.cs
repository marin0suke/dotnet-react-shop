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

        
    }
}