
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DotnetReactShop.Models;
using Microsoft.IdentityModel.Tokens;

namespace DotnetReactShop.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<string> GenerateJwtToken(ApplicationUser user) 
        {
            var jwtSettings = _configuration.GetSection("JwtSettings"); // retrieves config in appSettings. (secretkey issuer audience).
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetValue<string>("SecretKey"))); // grabs secretkey. converts into byte array, and turns into security key.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); // creates signing creds using the key above, alg specs. used by JWT to create digital signature. this is verified when the token is validated.

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email), // subject claim.
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // unique id.
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings.GetValue<string>("Issuer"),
                audience: jwtSettings.GetValue<string>("Audience"),
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token); // serialising to return to client.
            return Task.FromResult(tokenString); // wrap in Task so method matches the async signature where it is used in the controller.
        }
    }
}

//reads JWT settings from configuration in DI container, builds claims based on the 
// applicationUser (email, password etc) and generates a JWT token that expires in one hour. 

//isolating this logic makes it easier to adjust token settings - add more claim - or replace the token generation logic
// without changing the controller.

// async signature so that controller can await this result. 