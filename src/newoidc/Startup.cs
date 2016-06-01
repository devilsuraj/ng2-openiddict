using System.Linq;
using CryptoHelper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict;
using OpenIddict.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using newoidc.Data;
using newoidc.Models;
using newoidc.Services;
using NWebsec.AspNetCore.Middleware;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace newoidc
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
       
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
      /*
            services.AddAuthentication(options => {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });*/
            // Add framework services.
            
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddOpenIddict();

            services.AddMvc();

          

    
            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
            app.UseBrowserLink();

            app.UseStaticFiles();
          // app.UseOAuthValidation();
            app.UseIdentity();
            app.UseGoogleAuthentication(new GoogleOptions
            {
                ClientId = "862227465575-q1spfclcfvflg4tpesfkle4e0jc3q987.apps.googleusercontent.com",
                ClientSecret = "ozzg2VvH2TYbSbBYWE_HIYG5"
        
            });

            app.UseTwitterAuthentication(new TwitterOptions
            {
                ConsumerKey = "6XaCTaLbMqfj6ww3zvZ5g",
                ConsumerSecret = "Il2eFzGIrYhz6BWjYhVXBPQSfZuS4xoHpSSyD9PI"
            });


            // This must be *after* "app.UseIdentity();" above
            app.UseOpenIddict(options =>
            {
                options.Options.UseJwtTokens();
                // NOTE: for dev consumption only! for live, this is not encouraged!
              //  options.Options.AllowInsecureHttp = true;
               // options.Options.ApplicationCanDisplayErrors = true;
                // You can customize the default Content Security Policy (CSP) by calling UseNWebsec explicitly.
                // This can be useful to allow your HTML views to reference remote scripts/images/styles.
                options.UseNWebsec(directives =>
                {
                    directives.DefaultSources(directive => directive.Self().CustomSources("*"))
                        .ImageSources(directive => directive.Self().CustomSources("*","data:"))
                        .ScriptSources(directive => directive
                            .Self()
                            .UnsafeEval()
                            .UnsafeInline()
                            .CustomSources("*"))
                        .StyleSources(directive => directive
                        .Self()
                         .CustomSources("*")
                            .UnsafeInline());
                });
            });
         /*      app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                LoginPath = new PathString("/signin")
               
            });/*
           /* app.UseOpenIdConnectAuthentication(new OpenIdConnectOptions
            {   ClientId = "myClient",
                ClientSecret = "secret_secret_secret",
                PostLogoutRedirectUri = "http://localhost:58056",
                RequireHttpsMetadata = false,
                GetClaimsFromUserInfoEndpoint = true,
                SaveTokens = true,
                ResponseType = OpenIdConnectResponseTypes.IdToken,
                Authority = "http://localhost:58056/",
                Scope = { "email", "roles" }
            });*/

            /* //// this thing is required at first start to get the details stored in db
                 using (var context = app.ApplicationServices.GetRequiredService<ApplicationDbContext>())
                 {
                     context.Database.EnsureCreated();
                     if (!context.Applications.Any())
                     {
                         context.Applications.Add(new Application
                         {
                             Id = "myClient",
                             DisplayName = "My client application",
                             RedirectUri = "http://localhost:58056" + "/signin-oidc",
                             LogoutRedirectUri = "http://localhost:58056",
                             Secret = Crypto.HashPassword("secret_secret_secret"),
                             Type = OpenIddictConstants.ApplicationTypes.Public
                         });

                         context.SaveChanges();
                     }
                 }

         */
           
            // use jwt bearer authentication
         /*   app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                RequireHttpsMetadata = false,
                Audience = "http://localhost:58056/",
                Authority = "http://localhost:58056/"
            });*/
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                
                routes.MapRoute(
                    name: "spa-fallback",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" });
            });
          
        }
    }
}
