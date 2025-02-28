
using DotnetReactShop.Models;
using Microsoft.EntityFrameworkCore;

namespace DotnetReactShop.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) // hold config settings for context. ie connection string, db provider etc. allows ef core to be config externally eg in program.cs. : base passes the options to the base DbContext class. base class uses these options to set up the connection to the db and configure its behaviour.
        {
            //  base constructor handles the config. add extra setup here if necessary.
        }

        public DbSet<Product> Products { get; set; }
    }
}