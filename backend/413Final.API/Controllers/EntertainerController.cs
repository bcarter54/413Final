using _413Final.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace _413Final.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private FinalDbContext _context;

        public EntertainerController(FinalDbContext context)
        {
            _context = context;
        }

        [HttpGet("AllEntertainers")]
        public IActionResult GetEntertainers(int pageCount = 10, int pageNum = 1)
        {
            // Total count
            var totalEntertainers = _context.Entertainers.Count();

            // Get paginated entertainers (SQL level)
            var entertainers = _context.Entertainers
                .Skip((pageNum - 1) * pageCount)
                .Take(pageCount)
                .ToList(); // Materialize into memory

            // Get all engagements (so we can filter in memory)
            var allEngagements = _context.Engagements.ToList();

            // Now enhance each entertainer in memory with BookingCount and MostRecentBooking
            var resultEntertainers = entertainers.Select(e =>
            {
                var engagements = allEngagements
                    .Where(en => en.EntertainerID == e.EntertainerID)
                    .ToList();

                var bookingCount = engagements.Count;

                DateTime? mostRecentBooking = engagements
                    .Select(en =>
                    {
                        DateTime parsed;
                        return DateTime.TryParse(en.StartDate, out parsed) ? parsed : (DateTime?)null;
                    })
                    .Where(d => d != null)
                    .OrderByDescending(d => d)
                    .FirstOrDefault();

                return new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    e.EntSSN,
                    e.EntStreetAddress,
                    e.EntCity,
                    e.EntState,
                    e.EntZipCode,
                    e.EntPhoneNumber,
                    e.EntWebPage,
                    e.EntEMailAddress,
                    e.DateEntered,
                    BookingCount = bookingCount,
                    MostRecentBooking = mostRecentBooking?.Date.ToString("yyyy-MM-dd")
                };
            }).ToList();

            return Ok(new
            {
                Entertainers = resultEntertainers,
                TotalNum = totalEntertainers
            });
        }

        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            _context.SaveChanges();
            return Ok(entertainer);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Entertainer>> GetEntertainerById(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);

            if (entertainer == null)
            {
                return NotFound();
            }

            return entertainer;
        }
        
        [HttpPut("UpdateEntertainer/{id}")]
public async Task<IActionResult> UpdateEntertainer(int id, Entertainer updatedEntertainer)
{
    if (id != updatedEntertainer.EntertainerID)
    {
        return BadRequest("ID mismatch between route and body");
    }

    var existingEntertainer = await _context.Entertainers.FindAsync(id);

    if (existingEntertainer == null)
    {
        return NotFound();
    }

    // Update fields to match your PascalCase model
    existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
    existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
    existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
    existingEntertainer.EntCity = updatedEntertainer.EntCity;
    existingEntertainer.EntState = updatedEntertainer.EntState;
    existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
    existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
    existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
    existingEntertainer.EntEMailAddress = updatedEntertainer.EntEMailAddress;
    existingEntertainer.DateEntered = updatedEntertainer.DateEntered;
    
    _context.Entertainers.Update(existingEntertainer);
    _context.SaveChanges();
    // Optional: return a projected result that matches your formatting (e.g., MostRecentBooking as yyyy-MM-dd string)
    return Ok(new
    {
        updatedEntertainer.EntertainerID,
        updatedEntertainer.EntStageName,
        updatedEntertainer.EntSSN,
        updatedEntertainer.EntStreetAddress,
        updatedEntertainer.EntCity,
        updatedEntertainer.EntState,
        updatedEntertainer.EntZipCode,
        updatedEntertainer.EntPhoneNumber,
        updatedEntertainer.EntWebPage,
        updatedEntertainer.EntEMailAddress,
        updatedEntertainer.DateEntered
    });
}

        [HttpDelete("DeleteEntertainer/{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var entertainer = await _context.Entertainers.FindAsync(id);
            if (entertainer == null)
            {
                return NotFound();
            }

            _context.Entertainers.Remove(entertainer);
            await _context.SaveChangesAsync();

            return NoContent(); // 204
        }








    }
}
