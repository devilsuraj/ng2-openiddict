using System.Security.Claims;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using newoidc.Data;
using Microsoft.AspNetCore.Identity;
using newoidc.Models;

namespace newoidc.Controllers
{
    [Route("api")]
    public class ResourceController : Controller
    {
        [Authorize(ActiveAuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        [HttpGet("message")]
        public IActionResult GetMessage()
        {
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return Content($"{identity.Name} has not been  authenticated.");
            }

            return Content($"{identity.Name} has been successfully authenticated.");
        }
    }


    [Authorize]
    public class TestController : Controller
    {
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public TestController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Route("api/test"), HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Ok("No user - not logged in");// if Authorize is not applied
            return Ok(user);
        }
    }
}