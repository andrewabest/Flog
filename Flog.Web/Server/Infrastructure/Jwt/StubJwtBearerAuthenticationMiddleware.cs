using Microsoft.Owin;
using Microsoft.Owin.Security.Infrastructure;
using Owin;

namespace Flog.Web.Server.Infrastructure.Jwt
{
    public class StubJwtBearerAuthenticationMiddleware : AuthenticationMiddleware<StubJwtBearerAuthenticationOptions>
    {
        public StubJwtBearerAuthenticationMiddleware(
            OwinMiddleware next,
            IAppBuilder app,
            StubJwtBearerAuthenticationOptions options)
            : base(next, options)
        {
        }

        protected override AuthenticationHandler<StubJwtBearerAuthenticationOptions> CreateHandler()
        {
            return new StubJwtBearerAuthenticationHandler();
        }
    }
}