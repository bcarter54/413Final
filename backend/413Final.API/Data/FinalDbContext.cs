using Microsoft.EntityFrameworkCore;

namespace _413Final.API.Data;

public class FinalDbContext : DbContext
{
    public FinalDbContext(DbContextOptions<FinalDbContext> options) : base(options)
    {
    }
    
    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }
}