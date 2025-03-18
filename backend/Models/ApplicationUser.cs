using Microsoft.AspNetCore.Identity;

namespace DotnetReactShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public IEnumerable<Order> Orders { get; set; }
    }
}

