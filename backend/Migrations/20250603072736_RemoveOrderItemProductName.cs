using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveOrderItemProductName : Migration
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
                    { "seed-retailer-1", 0, "9cf45f13-f74a-4afc-b4c8-28620893a6c8", "retailer1@example.com", true, false, null, "RETAILER1@EXAMPLE.COM", "RETAILER1@EXAMPLE.COM", "AQAAAAIAAYagAAAAEEX66w1WyvnVJMGV7X2eKYnkHX0RlzbQ9AQiy+JyuXwYLnGMu6eBleZ6bKgVkLHl3w==", null, false, "b9354237-32de-4611-b73e-b4a6125cdc16", false, "retailer1@example.com" },
                    { "seed-retailer-2", 0, "45c532be-0003-49ae-91ed-2a7349e56e62", "retailer2@example.com", true, false, null, "RETAILER2@EXAMPLE.COM", "RETAILER2@EXAMPLE.COM", "AQAAAAIAAYagAAAAEBJXo140IaSuc2MkT+m/11WQLtRYzhCVVu+R9S9+Blmkabuu22utkntQTqZwRhnPxg==", null, false, "eaa97cdc-db0a-4896-a0b7-af498f0946cf", false, "retailer2@example.com" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
