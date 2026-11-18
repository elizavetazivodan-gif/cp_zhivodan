using Microsoft.EntityFrameworkCore;
using StudentCouncil.Api.Models;

namespace StudentCouncil.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Poll> Polls { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Proposal> Proposals { get; set; }
        public DbSet<CouncilMember> CouncilMembers { get; set; }
    }
}