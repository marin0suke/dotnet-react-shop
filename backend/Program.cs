using System.Security.Claims;
using System.Text;
using DotnetReactShop.Data;
using DotnetReactShop.Models;
using DotnetReactShop.Repositories;
using DotnetReactShop.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using DotnetReactShop.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings.GetValue<string>("SecretKey");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => 
{
    options.SaveToken = true; // prevents re-validation every request.
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.GetValue<string>("Issuer"),
        ValidAudience = jwtSettings.GetValue<string>("Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        NameClaimType = ClaimTypes.NameIdentifier // ensures correct UserId. 
    };
});

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(MappingProfile)); 

builder.Services.AddCors(options => // added CORS so backend allows cross-origin requests. got errors after adding routes and connecting front to back.
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // allows cookies and auth headers.
    });
});

//register the repository and service. tells DI container to inject Service when interface is requested.
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IPaymentService, PaymentService>(); 
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddTransient<AdminUserSeeder>();

// builder.Services.AddEndpointsApiExplorer(); // do i need these?
// builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReactApp"); // enable before other middleware (like auth).

using (var scope = app.Services.CreateScope()) // good for dev but remove in production to prevent unexpected migrations.
{
    var services = scope.ServiceProvider;

    var db = services.GetRequiredService<AppDbContext>(); // retrieves an instance of AppDbContext from the dependency injection container.
    db.Database.Migrate(); // applies any pending migrations to db. 

    await DotnetReactShop.Infrastructure.DbInitializer.SeedRolesAsync(services); // seed roles.
    
    // Add admin user seeder
    var adminSeeder = services.GetRequiredService<AdminUserSeeder>();
    await adminSeeder.SeedAdminUserAsync();
} // this migrates the databse on startup - optional for development. 

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthentication(); // added before authorisation.
app.UseAuthorization(); // added when ??
app.MapControllers();

app.Run();

