using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCouncil.Api.Data;
using StudentCouncil.Api.Models;

namespace StudentCouncil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProposalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProposalsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Proposals (перегляд ідей адміном)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Proposal>>> GetProposals()
        {
            return await _context.Proposals
                .OrderByDescending(p => p.SubmissionDate)
                .ToListAsync();
        }

        // POST: api/Proposals (надіслати ідею)
        [HttpPost]
        public async Task<ActionResult<Proposal>> SubmitProposal(Proposal proposal)
        {
            proposal.SubmissionDate = DateTime.UtcNow;
            _context.Proposals.Add(proposal);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Дякуємо! Вашу пропозицію надіслано." });
        }
    }
}