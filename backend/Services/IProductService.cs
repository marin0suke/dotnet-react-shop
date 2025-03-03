
using DotnetReactShop.Models;

namespace DotnetReactShop.Services
{
    public interface IProductService
    {
        Task<Product> GetProductAsync(int id);
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> CreateProductAsync(Product product);
        Task UpdateProductAsync(int id, Product product);
        Task DeleteProductAsync(int id);
    }
}

// defines higher level operations on Products.
// might later include more business logic, validations, or combine data from multiple sources. 
