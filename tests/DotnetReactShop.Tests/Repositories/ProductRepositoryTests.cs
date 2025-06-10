using Xunit;                                    // [Fact], Assert
using Microsoft.EntityFrameworkCore;             // UseInMemoryDatabase, DbContextOptionsBuilder
using DotnetReactShop.Data;                      // AppDbContext
using DotnetReactShop.Models;                    // Product entity
using DotnetReactShop.Repositories;              // ProductRepository
using System;                                    // Guid
using System.Threading.Tasks; 

namespace DotnetReactShop.Tests.Repositories
{
    public class ProductRepositoryTests
    {
        private AppDbContext CreateInMemoryContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        [Fact]
        public async Task GetByIdAsync_ProductExists_ReturnsCorrectProduct()
        {
            // Given
            await using var context = CreateInMemoryContext();

            var seeded = new Product
            {
                Id = 1,
                Name = "TestProduct",
                Description = "Test description",
                Price = 9.99m,
                ImageUrl = "Testurl"
            };

            await context.Products.AddAsync(seeded); // adds seeded via EF Core api.
            await context.SaveChangesAsync(); // saves to db instance.

            var repo = new ProductRepository(context); // create repo instance.

            // When
            var result = await repo.GetByIdAsync(1);

            // Then
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal("TestProduct", result.Name);
            Assert.Equal("Test description", result.Description);
            Assert.Equal("Testurl", result.ImageUrl);
        }


    }
}