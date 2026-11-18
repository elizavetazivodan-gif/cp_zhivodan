using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentCouncil.Api.Models
{
    public class Poll
    {
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string QuestionText { get; set; } = string.Empty;

        [Required, Column(TypeName = "json")]
        public string OptionsJson { get; set; } = "[]";

        public bool IsActive { get; set; } = true;

        public ICollection<Vote> Votes { get; set; } = new List<Vote>();
    }
}