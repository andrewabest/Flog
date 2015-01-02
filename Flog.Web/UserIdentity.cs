using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Nancy.Security;

namespace Flog.Web
{
    public class UserIdentity : IUserIdentity
    {
        public UserIdentity(ClaimsIdentity claimsIdentity)
        {
            UserName = claimsIdentity.Name;
            ActualClaims = claimsIdentity.Claims;
        }

        public IEnumerable<Claim> ActualClaims { get; private set; }

        public string UserName { get; private set; }

        public IEnumerable<string> Claims
        {
            get { return ActualClaims.Select(c => c.ToString()); }
        }
    }
}