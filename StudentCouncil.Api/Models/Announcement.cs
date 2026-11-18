using System.ComponentModel.DataAnnotations;

namespace StudentCouncil.Api.Models
{
    public class Announcement
    {
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(2000)]
        public string Description { get; set; } = string.Empty;

        public DateTime EventDate { get; set; }

        [MaxLength(500)]
        public string? PosterUrl { get; set; }

        public bool IsRegistrationOpen { get; set; } = true;

        [Required, MaxLength(20)]
        public string PublicationStatus { get; set; } = "Active"; 

        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}