using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class POC_SeedRetailersAndOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "OrderDate", "ShippingAddress", "ShippingCity", "ShippingCountry", "ShippingName", "ShippingPostalCode", "Total", "UserId" },
                values: new object[,]
                {
                    { 200, new DateTime(2025, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "123 Main St", "Brisbane", "Australia", "Retailer One (Wholesale)", "4000", 0m, "seed-retailer-1" },
                    { 201, new DateTime(2025, 6, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "123 Main St", "Brisbane", "Australia", "Retailer One (Wholesale)", "4000", 0m, "seed-retailer-1" },
                    { 202, new DateTime(2025, 6, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), "456 Oak Ave", "Gold Coast", "Australia", "Retailer Two (Wholesale)", "4217", 0m, "seed-retailer-2" },
                    { 203, new DateTime(2025, 6, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), "456 Oak Ave", "Gold Coast", "Australia", "Retailer Two (Wholesale)", "4217", 0m, "seed-retailer-2" }
                });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "OrderId", "ProductId", "Quantity", "UnitPrice" },
                values: new object[,]
                {
                    { 2000, 200, 1, 50, 17.99m },
                    { 2001, 200, 2, 40, 14.99m },
                    { 2002, 201, 3, 100, 9.99m },
                    { 2003, 201, 4, 60, 15.99m },
                    { 2004, 202, 2, 30, 14.99m },
                    { 2005, 202, 5, 20, 12.99m },
                    { 2006, 202, 1, 15, 17.99m },
                    { 2007, 203, 5, 200, 12.99m },
                    { 2008, 203, 1, 80, 17.99m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2000);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2001);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2002);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2003);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2004);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2005);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2006);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2007);

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: 2008);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 200);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 201);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 202);

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 203);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-1",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "9cf45f13-f74a-4afc-b4c8-28620893a6c8", "AQAAAAIAAYagAAAAEEX66w1WyvnVJMGV7X2eKYnkHX0RlzbQ9AQiy+JyuXwYLnGMu6eBleZ6bKgVkLHl3w==", "b9354237-32de-4611-b73e-b4a6125cdc16" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "45c532be-0003-49ae-91ed-2a7349e56e62", "AQAAAAIAAYagAAAAEBJXo140IaSuc2MkT+m/11WQLtRYzhCVVu+R9S9+Blmkabuu22utkntQTqZwRhnPxg==", "eaa97cdc-db0a-4896-a0b7-af498f0946cf" });
        }
    }
}
