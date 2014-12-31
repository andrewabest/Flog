using System.Reflection;
using Autofac;
using Flog.Web.Bundling;
using Microsoft.Owin.Extensions;
using Nancy;
using Nancy.Conventions;
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