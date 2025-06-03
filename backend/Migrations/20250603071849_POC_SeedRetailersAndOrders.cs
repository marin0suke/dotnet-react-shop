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
            migrationBuilder.DropColumn(
                name: "ProductName",
                table: "OrderItems");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "seed-retailer-1", 0, "603d7e3f-3912-4105-b319-e04ac69c1f99", "retailer1@example.com", true, false, null, "RETAILER1@EXAMPLE.COM", "RETAILER1@EXAMPLE.COM", "AQAAAAIAAYagAAAAEJzne6R6WQLWVB0ll14CVB7u28ytdudTFdxcjpGhXfbF8DkhhGM8USSqwlkBmH28kQ==", null, false, "411691b0-a99e-4324-a9c1-74d5b8420bef", false, "retailer1@example.com" },
                    { "seed-retailer-2", 0, "31af38b4-d1e3-43f9-99e0-ebb870e200af", "retailer2@example.com", true, false, null, "RETAILER2@EXAMPLE.COM", "RETAILER2@EXAMPLE.COM", "AQAAAAIAAYagAAAAENV2CPoC9ywG4wHfHdXkZH3mxOt3+6nep5asr5V3OjBA2w4pOcVQB89ctNjXZ9KIYg==", null, false, "5428c25b-0fcf-46b2-886a-af4c9801f17e", false, "retailer2@example.com" }
                });

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

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-1");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "seed-retailer-2");

            migrationBuilder.AddColumn<string>(
                name: "ProductName",
                table: "OrderItems",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
