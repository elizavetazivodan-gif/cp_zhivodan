using System.ComponentModel.DataAnnotations;

namespace StudentCouncil.Api.Models
{
    public class Proposal
    {
        public int Id { get; set; }

        [Required, MaxLength(1000)]
        public string IdeaText { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? ContactInfo { get; set; }

        public DateTime SubmissionDate { get; set; } = DateTime.UtcNow;
    }
}