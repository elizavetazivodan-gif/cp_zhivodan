using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCouncil.Api.Data;
using StudentCouncil.Api.Models;

namespace StudentCouncil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PollsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PollsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Polls (отримати опитування разом із підрахунком голосів)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetPolls()
        {
            var polls = await _context.Polls
                .Include(p => p.Votes)
                .ToListAsync();

            var result = polls.Select(p => new
            {
                p.Id,
                p.Title,
                p.QuestionText,
                p.OptionsJson,
                p.IsActive,
                TotalVotes = p.Votes.Count,
                Results = p.Votes
                    .GroupBy(v => v.OptionIndex)
                    .ToDictionary(g => g.Key, g => g.Count())
            });

            return Ok(result);
        }

        // POST: api/Polls (створити опитування - для адміна)
        [HttpPost]
        public async Task<ActionResult<Poll>> CreatePoll(Poll poll)
        {
            _context.Polls.Add(poll);
            await _context.SaveChangesAsync();
            return Ok(poll);
        }

        // POST: api/Polls/5/vote (проголосувати в опитуванні)
        [HttpPost("{id}/vote")]
        public async Task<IActionResult> Vote(int id, [FromBody] int optionIndex)
        {
            var poll = await _context.Polls.FindAsync(id);
            if (poll == null) return NotFound("Опитування не знайдено.");
            if (!poll.IsActive) return BadRequest("Опитування вже закрито.");

            var vote = new Vote
            {
                PollId = id,
                OptionIndex = optionIndex,
                VoteDate = DateTime.UtcNow
            };

            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ваш голос враховано!" });
        }

        // DELETE: api/Polls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePoll(int id)
        {
            var poll = await _context.Polls.FindAsync(id);
            if (poll == null) return NotFound();

            _context.Polls.Remove(poll);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}