using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentCouncil.Api.Data;
using StudentCouncil.Api.Models;

namespace StudentCouncil.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Applications?announcementId=1 (перегляд заявок адміном)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications([FromQuery] int? announcementId)
        {
            var query = _context.Applications.Include(a => a.Announcement).AsQueryable();

            if (announcementId.HasValue)
            {
                query = query.Where(a => a.AnnouncementId == announcementId.Value);
            }

            return await query.OrderByDescending(a => a.RegistrationDate).ToListAsync();
        }

        // POST: api/Applications (подання заявки студентом)
        [HttpPost]
        public async Task<ActionResult<Application>> SubmitApplication(Application application)
        {
            var announcement = await _context.Announcements.FindAsync(application.AnnouncementId);
            if (announcement == null) return NotFound("Анонс не знайдено.");
            if (!announcement.IsRegistrationOpen) return BadRequest("Реєстрацію на цю подію закрито.");

            application.RegistrationDate = DateTime.UtcNow;
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Заявку успішно зареєстровано!", id = application.Id });
        }
    }
}