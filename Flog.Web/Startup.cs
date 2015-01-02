using Autofac;
using Flog.Web.Server.Infrastructure.Jwt;
using Microsoft.Owin.Extensions;
using Owin;

namespace Flog.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var builder = new ContainerBuilder();
            builder.RegisterAssemblyModules(GetType().Assembly);
            var container = builder.Build();

            app.Use(typeof(StubJwtBearerAuthenticationMiddleware), app, new StubJwtBearerAuthenticationOptions("jwt"));
            app.UseStageMarker(PipelineStage.Authenticate);
            app.UseNancy(options =>
            {
                var bootstrapper = new FlogNancyBootstrapper()
                    .UseContainer(container);

                options.Bootstrapper = bootstrapper;
            });
            app.UseStageMarker(PipelineStage.MapHandler);
        }
    }
}