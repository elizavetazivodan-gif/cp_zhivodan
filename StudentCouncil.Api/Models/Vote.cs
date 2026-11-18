namespace StudentCouncil.Api.Models
{
    public class Vote
    {
        public int Id { get; set; }

        public int PollId { get; set; }
        public Poll? Poll { get; set; }

        public int OptionIndex { get; set; }

        public DateTime VoteDate { get; set; } = DateTime.UtcNow;
    }
}