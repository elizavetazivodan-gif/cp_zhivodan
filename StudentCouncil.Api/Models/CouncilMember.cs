using System.ComponentModel.DataAnnotations;

namespace StudentCouncil.Api.Models
{
    public class CouncilMember
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Position { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        [MaxLength(50)]
        public string? TelegramTag { get; set; }

        public int DisplayOrder { get; set; }
    }
}