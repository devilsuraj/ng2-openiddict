using System.Security.Claims;
using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using newoidc.Data;
using Microsoft.AspNetCore.Identity;
using newoidc.Models;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http;
using System.Net.Http.Headers;
using System;

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

     

        [Route("api/test2"), HttpGet]
        public async Task<IActionResult> GetToken()


        {
            using (var client = new HttpClient())
            {
                
                var token = await HttpContext.Authentication.GetTokenAsync("Id_Token");
                if (string.IsNullOrEmpty(token))
                {
                    throw new InvalidOperationException("The access token cannot be found in the authentication ticket. " +
                                                        "Make sure that SaveTokens is set to true in the OIDC options.");
                }

                var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:58056/api/message");
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                // var response = await client.SendAsync(request, cancellationToken);
                // response.EnsureSuccessStatusCode();

                return Ok(token);


            }
             
                 /*
            var user = await _userManager.GetUserAsync(User);
            var token = await HttpContext.Authentication.GetTokenAsync("access_token");
            if (user == null) return Ok("No user - not logged in");// if Authorize is not applied*/
            
        }
    }
}