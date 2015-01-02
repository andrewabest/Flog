using Microsoft.Owin.Security;

namespace Flog.Web.Server.Infrastructure.Jwt
{
    public class StubJwtBearerAuthenticationOptions : AuthenticationOptions
    {
        public StubJwtBearerAuthenticationOptions(string authenticationType) : base(authenticationType)
        {
        }
    }
}