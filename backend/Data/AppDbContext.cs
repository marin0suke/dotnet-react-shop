using DotnetReactShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DotnetReactShop.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) // hold config settings for context. ie connection string, db provider etc. allows ef core to be config externally eg in program.cs. : base passes the options to the base DbContext class. base class uses these options to set up the connection to the db and configure its behaviour.
        {
            //  base constructor handles the config. add extra setup here if necessary.
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Sample Product A",
                    Description = "This is the first sample product.",
                    Price = 9.99m,
                    ImageUrl = "https://via.placeholder.com/150"
                },
                new Product
                {
                    Id = 2,
                    Name = "Sample Product B",
                    Description = "This is the second sample product.",
                    Price = 14.99m,
                    ImageUrl = "https://via.placeholder.com/150"
                },
                new Product
                {
                    Id = 3,
                    Name = "Sample Product C",
                    Description = "This is the third sample product.",
                    Price = 19.99m,
                    ImageUrl = "https://via.placeholder.com/150"
                }
            );

            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // CartItem relationships
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

// adding seed data - override the OnModelCreating method to seed data.