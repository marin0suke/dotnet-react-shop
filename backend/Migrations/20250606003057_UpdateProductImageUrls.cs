using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProductImageUrls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e833b501-a395-4c70-b374-e3918a4ea67b", "AQAAAAIAAYagAAAAEGmzyQRSQKPRwoDI0jxnGvbKvDpvQJgtF82+sPkPQP9y3lW1csyQcI/XehZqVsk+xw==", "1587a16c-3916-404d-97a1-ba7460907af5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e8c1243b-cecf-4825-a001-9a0ec057bf35", "AQAAAAIAAYagAAAAEC4R1f2kDYoiGyTezj8g7diChaHByd6AhrK/Mrt655hII6wHya2gUpjr6jmY0d6/kA==", "3d74b050-9183-4cbd-a6b7-faad07cc6a19" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "/assets/products/Biotin1_1000x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: "/assets/products/ACV110_1000x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: "/assets/products/hyaluronicacid_700x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "/assets/products/B121_1000x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "/assets/products/kidsfibre_700x.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "df865388-3f5a-4579-8699-f388fb6fabf9", "AQAAAAIAAYagAAAAELJBdt/C9XGZ5ySfHkTsgimEoAQ3ktUz7lST3rp6bMjBBCckP/JuOrQtxir/wiPtKA==", "c2721054-1f93-45f4-b48b-ddc15aef7754" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d3c9efa0-4912-47f5-b501-d68c2c86a2fc", "AQAAAAIAAYagAAAAEEKFBNpzPRwDXEx78cF2wNtsrAvaAbcPh5wJGj/cATztN2g+VjvgFPKuoCU7DuTg2w==", "5f5ff085-3b3e-4b1d-9da9-1715c66397d9" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: "./assets/products/Biotin1_1000x.png");

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
                column: "ImageUrl",
                value: "./assets/products/hyaluronicacid_700x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: "./assets/products/B121_1000x.png");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: "./assets/products/kidsfibre_700x.png");
        }
    }
}
