
using DotnetReactShop.Models;
using DotnetReactShop.Repositories;

namespace DotnetReactShop.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRespository;

        public ProductService(IProductRepository productRepository) // depends on repository, which is injected.
        {
            _productRespository = productRepository;
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _productRespository.GetByIdAsync(id); // we use the method defined in repo layer, which utilises EF code.
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productRespository.GetAllAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            await _productRespository.AddAsync(product);
            return product;
        }

        public async Task UpdateProductAsync(int id, Product product)
        {
            // validation could go here before updating.
            await _productRespository.UpdateAsync(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            await _productRespository.DeleteAsync(id);
        }
    }
}