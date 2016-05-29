using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;


namespace newoidc.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet("~/")]
        public ActionResult Index()
        {
            return View("index");
        }

        [Authorize, HttpPost("~/")]
        public async Task<ActionResult> Index(CancellationToken cancellationToken)
        {
            using (var client = new HttpClient())
            {
                
                    var token = await HttpContext.Authentication.GetTokenAsync("access_token");
                    if (string.IsNullOrEmpty(token))
                    {
                        throw new InvalidOperationException("The access token cannot be found in the authentication ticket. " +
                                                            "Make sure that SaveTokens is set to true in the OIDC options.");
                    }

                    var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:58056/api/message");
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

                    var response = await client.SendAsync(request, cancellationToken);
                    response.EnsureSuccessStatusCode();

                    return View("index", model: await response.Content.ReadAsStringAsync());

               
            }
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }

   
}
