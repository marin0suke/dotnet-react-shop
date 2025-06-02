using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SeedProductsTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "Support your beauty from the inside out with our Good Biotin Gummies. Specially crafted to help promote stronger hair, healthier skin, and resilient nails, these delicious gummies are an easy addition to your daily routine. Enjoy a tasty way to glow!", "./public/assets/products/Biotin1_1000x.webp", "Good Biotin Gummies: Skin, Hair & Nails", 10.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Experience the benefits of apple cider vinegar in a delicious, convenient gummy. These gummies help support natural detoxification, curb cravings, and promote healthy weight management without the harsh taste of liquid vinegar.", "./public/assets/products/ACV110_1000x.webp", "Apple Cider Vinegar Gummies - Detoxify & Weight Management" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "Nourish your skin and joints with our Good Hyaluronic Acid Vegan Collagen Gummies. Packed with hyaluronic acid and plant-based collagen builders, these gummies help maintain skin hydration and support healthy joints, giving you a youthful, radiant glow from within.", "./public/assets/products/hyaluronicacid_700x.webp", "Good Hyaluronic Acid - Vegan Collagen Gummies" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ImageUrl", "Name", "Price" },
                values: new object[] { "This is the first sample product.", "https://via.placeholder.com/150", "Sample Product A", 9.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "This is the second sample product.", "https://via.placeholder.com/150", "Sample Product B" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "ImageUrl", "Name" },
                values: new object[] { "This is the third sample product.", "https://via.placeholder.com/150", "Sample Product C" });
        }
    }
}
