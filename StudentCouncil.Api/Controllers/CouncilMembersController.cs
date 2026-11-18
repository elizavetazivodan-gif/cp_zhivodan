using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCouncil.Api.Data;
using StudentCouncil.Api.Models;

namespace StudentCouncil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouncilMembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CouncilMembersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/CouncilMembers (список команди за порядковим номером)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CouncilMember>>> GetCouncilMembers()
        {
            return await _context.CouncilMembers
                .OrderBy(m => m.DisplayOrder)
                .ToListAsync();
        }

        // POST: api/CouncilMembers (додати члена ради)
        [HttpPost]
        public async Task<ActionResult<CouncilMember>> AddMember(CouncilMember member)
        {
            _context.CouncilMembers.Add(member);
            await _context.SaveChangesAsync();
            return Ok(member);
        }

        // PUT: api/CouncilMembers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMember(int id, CouncilMember member)
        {
            if (id != member.Id) return BadRequest();
            _context.Entry(member).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/CouncilMembers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.CouncilMembers.FindAsync(id);
            if (member == null) return NotFound();
            _context.CouncilMembers.Remove(member);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}