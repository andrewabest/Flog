using System.Net.Sockets;
using System.Threading.Tasks;
using Nancy;
using Nancy.ModelBinding;

namespace Flog.Web.Server.Features
{
    public class UserNancyModule : NancyModule
    {
        public UserNancyModule() : base("auth")
        {
            Post["login", runAsync: true] = (args, ct) => Login();
        }

        private async Task<dynamic> Login()
        {
            var credentials = this.Bind<UserCredentails>();

            return Response.AsJson(new { Authenticated = true, UserName = "John Smith" });
        }
    }

    public class UserCredentails
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}