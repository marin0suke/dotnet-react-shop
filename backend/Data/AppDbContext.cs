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
                    Name = "Good Biotin Gummies: Skin, Hair & Nails",
                    Description = "Support your beauty from the inside out with our Good Biotin Gummies. Specially crafted to help promote stronger hair, healthier skin, and resilient nails, these delicious gummies are an easy addition to your daily routine. Enjoy a tasty way to glow!",
                    Price = 17.99m,
                    ImageUrl = "./assets/products/Biotin1_1000x.png"
                },
                new Product
                {
                    Id = 2,
                    Name = "Apple Cider Vinegar Gummies - Detoxify & Weight Management",
                    Description = "Experience the benefits of apple cider vinegar in a delicious, convenient gummy. These gummies help support natural detoxification, curb cravings, and promote healthy weight management without the harsh taste of liquid vinegar.",
                    Price = 14.99m,
                    ImageUrl = "./assets/products/ACV110_1000x.png"
                },
                new Product
                {
                    Id = 3,
                    Name = "Good Hyaluronic Acid - Vegan Collagen Gummies",
                    Description = "Nourish your skin and joints with our Good Hyaluronic Acid Vegan Collagen Gummies. Packed with hyaluronic acid and plant-based collagen builders, these gummies help maintain skin hydration and support healthy joints, giving you a youthful, radiant glow from within.",
                    Price = 9.99m,
                    ImageUrl = "./assets/products/hyaluronicacid_700x.png"
                },
                  new Product
                {
                    Id = 4,
                    Name = "Good Vita-B12 Energy Boost Gummies",
                    Description = "Need a boost? Our Good Vita-B12 Energy Gummies deliver a potent source of vitamin B12 to support natural energy production and mental clarity. Say goodbye to sluggishness and hello to steady, vibrant energy—no caffeine crash!",
                    Price = 15.99m,
                    ImageUrl = "./assets/products/B121_1000x.png"
                },
                  new Product
                {
                    Id = 5,
                    Name = "Kids Good Fibre Vitamin Supplements Gummies - Digestive Health",
                    Description = "Keep your little ones’ digestion on track with our Kids Good Fibre Vitamin Gummies. Formulated with natural fiber and essential vitamins, these tasty gummies promote healthy digestion and gut health, making it easier than ever to support your child’s well-being.",
                    Price = 12.99m,
                    ImageUrl = "./assets/products/kidsfibre_700x.png"
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