using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;

namespace Flog.Web.Server.Infrastructure.Jwt
{
    public class StubJwtBearerAuthenticationHandler : AuthenticationHandler<StubJwtBearerAuthenticationOptions>
    {
        const string NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const string RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
        const string StringClaimValueType = "http://www.w3.org/2001/XMLSchema#string";

        protected override async Task<AuthenticationTicket> AuthenticateCoreAsync()
        {
            string token;

            if (TryRetrieveToken(Request, out token))
            {
                try
                {
                    // Normally decode the JWT ticket and extract the identity. For now, stub.

                    return new AuthenticationTicket(GetStubIdentity(), new AuthenticationProperties());

                }
                catch (Exception ex)
                {
                    return null;
                }
            }
            return null;
        }

        private ClaimsIdentity GetStubIdentity()
        {
            return new  ClaimsIdentity(
                new[] { new Claim(NameClaimType, "John Smith"), new Claim(RoleClaimType, "User") }, 
                Options.AuthenticationType,
                nameType: NameClaimType,
                roleType: RoleClaimType);
        }

        private static bool TryRetrieveToken(IOwinRequest request, out string token)
        {
            token = null;
            string[] authHeaders;

            if (request.Headers.TryGetValue("Authorization", out authHeaders) && authHeaders.Count() == 1)
            {
                // Remove the bearer token scheme prefix and return the rest as ACS token  
                var bearerToken = authHeaders.ElementAt(0);
                const string bearerPrefix = "Bearer ";
                token = bearerToken.StartsWith(bearerPrefix) ? bearerToken.Substring(bearerPrefix.Length) : bearerToken;
                return true;
            }

            // Fail if no Authorization header or more than one Authorization headers  
            // are found in the HTTP request  
            return false;
        }
    }
}