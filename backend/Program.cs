using DotnetReactShop.Data;
using DotnetReactShop.Repositories;
using DotnetReactShop.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

builder.Services.AddCors(options => // added CORS so backend allows cross-origin requests. got errors after adding routes and connecting front to back.
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

//register the repository and service.
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();

// builder.Services.AddEndpointsApiExplorer(); // do i need these?
// builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReactApp"); // enable before other middleware (like auth).

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>(); // retrieves an instance of AppDbContext from the dependency injection container.
    db.Database.Migrate(); // applies any pending migrations to db. 
} // this migrates the databse on startup - optional for development. 

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization(); // added when ??

app.MapControllers();

app.Run();

