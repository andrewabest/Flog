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
            BundleStartup.Setup();

            app.UseNancy();
            app.UseStageMarker(PipelineStage.MapHandler);
        }
    }

    public class Bootstrapper : DefaultNancyBootstrapper
    {
        // The bootstrapper enables you to reconfigure the composition of the framework,
        // by overriding the various methods and properties.
        // For more information https://github.com/NancyFx/Nancy/wiki/Bootstrapper

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("client", @"client")
                );
        }
    }
}