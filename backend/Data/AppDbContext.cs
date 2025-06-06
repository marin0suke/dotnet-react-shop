using DotnetReactShop.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;


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

                // 2) Prepare a PasswordHasher<ApplicationUser> so we can hash a dummy password:
            var hasher = new PasswordHasher<ApplicationUser>();

            // 3) Define the first dummy retailer:
            var retailer1 = new ApplicationUser
            {
                Id = "seed-retailer-1",                          // Unique ID for this user
                UserName = "retailer1@example.com",               // The login name
                NormalizedUserName = "RETAILER1@EXAMPLE.COM",     // Must be uppercase
                Email = "retailer1@example.com",                  // Email address
                NormalizedEmail = "RETAILER1@EXAMPLE.COM",        // Must be uppercase
                EmailConfirmed = true,                            // Mark email as “already confirmed”
                SecurityStamp = Guid.NewGuid().ToString("D")      // Any unique identifier 
            };
            // 4) Hash a dummy password, so that PasswordHash is non-null:
            retailer1.PasswordHash = hasher.HashPassword(retailer1, "Password123!");

            // 5) Define the second dummy retailer, same pattern:
            var retailer2 = new ApplicationUser
            {
                Id = "seed-retailer-2",
                UserName = "retailer2@example.com",
                NormalizedUserName = "RETAILER2@EXAMPLE.COM",
                Email = "retailer2@example.com",
                NormalizedEmail = "RETAILER2@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };
            retailer2.PasswordHash = hasher.HashPassword(retailer2, "Password123!");

            // 6) Tell EF Core to seed these two users into AspNetUsers table:
            modelBuilder.Entity<ApplicationUser>().HasData(retailer1, retailer2);


            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Name = "Good Biotin Gummies: Skin, Hair & Nails",
                    Description = "Support your beauty from the inside out with our Good Biotin Gummies. Specially crafted to help promote stronger hair, healthier skin, and resilient nails, these delicious gummies are an easy addition to your daily routine. Enjoy a tasty way to glow!",
                    Price = 17.99m,
                    ImageUrl = "/assets/products/Biotin1_1000x.png"
                },
                new Product
                {
                    Id = 2,
                    Name = "Apple Cider Vinegar Gummies - Detoxify & Weight Management",
                    Description = "Experience the benefits of apple cider vinegar in a delicious, convenient gummy. These gummies help support natural detoxification, curb cravings, and promote healthy weight management without the harsh taste of liquid vinegar.",
                    Price = 14.99m,
                    ImageUrl = "/assets/products/ACV110_1000x.png"
                },
                new Product
                {
                    Id = 3,
                    Name = "Good Hyaluronic Acid - Vegan Collagen Gummies",
                    Description = "Nourish your skin and joints with our Good Hyaluronic Acid Vegan Collagen Gummies. Packed with hyaluronic acid and plant-based collagen builders, these gummies help maintain skin hydration and support healthy joints, giving you a youthful, radiant glow from within.",
                    Price = 9.99m,
                    ImageUrl = "/assets/products/hyaluronicacid_700x.png"
                },
                  new Product
                {
                    Id = 4,
                    Name = "Good Vita-B12 Energy Boost Gummies",
                    Description = "Need a boost? Our Good Vita-B12 Energy Gummies deliver a potent source of vitamin B12 to support natural energy production and mental clarity. Say goodbye to sluggishness and hello to steady, vibrant energy—no caffeine crash!",
                    Price = 15.99m,
                    ImageUrl = "/assets/products/B121_1000x.png"
                },
                  new Product
                {
                    Id = 5,
                    Name = "Kids Good Fibre Vitamin Supplements Gummies - Digestive Health",
                    Description = "Keep your little ones’ digestion on track with our Kids Good Fibre Vitamin Gummies. Formulated with natural fiber and essential vitamins, these tasty gummies promote healthy digestion and gut health, making it easier than ever to support your child’s well-being.",
                    Price = 12.99m,
                    ImageUrl = "/assets/products/kidsfibre_700x.png"
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

            modelBuilder.Entity<Order>().HasData(
                // Order 200: Retailer 1 buys larger volume of Biotin and ACV
                new Order
                {
                    Id = 200,
                    UserId = "seed-retailer-1",
                    OrderDate = new DateTime(2025, 6, 1),
                    ShippingName = "Retailer One (Wholesale)",
                    ShippingAddress = "123 Main St",
                    ShippingCity = "Brisbane",
                    ShippingPostalCode = "4000",
                    ShippingCountry = "Australia"
                },
                // Order 201: Retailer 1 restocks Hyaluronic Acid and Vita-B12
                new Order
                {
                    Id = 201,
                    UserId = "seed-retailer-1",
                    OrderDate = new DateTime(2025, 6, 5),
                    ShippingName = "Retailer One (Wholesale)",
                    ShippingAddress = "123 Main St",
                    ShippingCity = "Brisbane",
                    ShippingPostalCode = "4000",
                    ShippingCountry = "Australia"
                },
                // Order 202: Retailer 2 places a mixed‐product order
                new Order
                {
                    Id = 202,
                    UserId = "seed-retailer-2",
                    OrderDate = new DateTime(2025, 6, 3),
                    ShippingName = "Retailer Two (Wholesale)",
                    ShippingAddress = "456 Oak Ave",
                    ShippingCity = "Gold Coast",
                    ShippingPostalCode = "4217",
                    ShippingCountry = "Australia"
                },
                // Order 203: Retailer 2 orders in bulk (Kid’s Fibre & Biotin)
                new Order
                {
                    Id = 203,
                    UserId = "seed-retailer-2",
                    OrderDate = new DateTime(2025, 6, 10),
                    ShippingName = "Retailer Two (Wholesale)",
                    ShippingAddress = "456 Oak Ave",
                    ShippingCity = "Gold Coast",
                    ShippingPostalCode = "4217",
                    ShippingCountry = "Australia"
                }
            );

            // ────────── 2) Seed corresponding OrderItems ──────────
            modelBuilder.Entity<OrderItem>().HasData(
                // ── Order 200 items ──
                // 50 units of Good Biotin Gummies (ProductId = 1) @ 17.99 each
                new OrderItem { Id = 2000, OrderId = 200, ProductId = 1, Quantity = 50, UnitPrice = 17.99m },
                // 40 units of Apple Cider Vinegar Gummies (ProductId = 2) @ 14.99 each
                new OrderItem { Id = 2001, OrderId = 200, ProductId = 2, Quantity = 40, UnitPrice = 14.99m },

                // ── Order 201 items ──
                // 100 units of Good Hyaluronic Acid (ProductId = 3) @  9.99 each
                new OrderItem { Id = 2002, OrderId = 201, ProductId = 3, Quantity = 100, UnitPrice = 9.99m },
                // 60 units of Good Vita-B12 (ProductId = 4) @ 15.99 each
                new OrderItem { Id = 2003, OrderId = 201, ProductId = 4, Quantity = 60, UnitPrice = 15.99m },

                // ── Order 202 items ──
                // 30 units of Apple Cider Vinegar Gummies (ProductId = 2) @ 14.99 each
                new OrderItem { Id = 2004, OrderId = 202, ProductId = 2, Quantity = 30, UnitPrice = 14.99m },
                // 20 units of Kids Good Fibre Gummies (ProductId = 5) @ 12.99 each
                new OrderItem { Id = 2005, OrderId = 202, ProductId = 5, Quantity = 20, UnitPrice = 12.99m },
                // 15 units of Good Biotin Gummies (ProductId = 1) @ 17.99 each
                new OrderItem { Id = 2006, OrderId = 202, ProductId = 1, Quantity = 15, UnitPrice = 17.99m },

                // ── Order 203 items ──
                // 200 units of Kids Good Fibre Gummies (ProductId = 5) @ 12.99 each
                new OrderItem { Id = 2007, OrderId = 203, ProductId = 5, Quantity = 200, UnitPrice = 12.99m },
                // 80 units of Good Biotin Gummies (ProductId = 1) @ 17.99 each
                new OrderItem { Id = 2008, OrderId = 203, ProductId = 1, Quantity = 80, UnitPrice = 17.99m }
            );
        }
    }
}

