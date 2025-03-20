using Microsoft.AspNetCore.Identity;

namespace DotnetReactShop.Models
{
    public class ApplicationUser : IdentityUser
    {
        public IEnumerable<Order> Orders { get; set; }
    }
}

// IdentityUser has properties defined bydefault - userId is a GUID string.