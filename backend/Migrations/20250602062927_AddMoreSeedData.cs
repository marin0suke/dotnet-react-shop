using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "./assets/products/Biotin1_1000x.png", 17.99m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "./assets/products/ACV110_1000x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "./assets/products/hyaluronicacid_700x.png", 9.99m });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "Name", "Price" },
                values: new object[,]
                {
                    { 4, "Need a boost? Our Good Vita-B12 Energy Gummies deliver a potent source of vitamin B12 to support natural energy production and mental clarity. Say goodbye to sluggishness and hello to steady, vibrant energy—no caffeine crash!", "./assets/products/B121_1000x.png", "Good Vita-B12 Energy Boost Gummies", 15.99m },
                    { 5, "Keep your little ones’ digestion on track with our Kids Good Fibre Vitamin Gummies. Formulated with natural fiber and essential vitamins, these tasty gummies promote healthy digestion and gut health, making it easier than ever to support your child’s well-being.", "./assets/products/kidsfibre_700x.png", "Kids Good Fibre Vitamin Supplements Gummies - Digestive Health", 12.99m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "./public/assets/products/Biotin1_1000x.webp", 10.00m });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "./public/assets/products/ACV110_1000x.webp");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "ImageUrl", "Price" },
                values: new object[] { "./public/assets/products/hyaluronicacid_700x.webp", 19.99m });
        }
    }
}
