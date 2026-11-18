using System.ComponentModel.DataAnnotations;

namespace StudentCouncil.Api.Models
{
    public class Application
    {
        public int Id { get; set; }

        public int AnnouncementId { get; set; }
        public Announcement? Announcement { get; set; }

        [Required, MaxLength(150)]
        public string StudentFullName { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Group { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Contact { get; set; } = string.Empty;

        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
    }
}