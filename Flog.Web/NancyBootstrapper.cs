using System;
using System.Security.Claims;
using Autofac;
using Flog.Web.Bundling;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Autofac;
using Nancy.Conventions;
using Nancy.ErrorHandling;
using Nancy.Responses;
using Nancy.Serialization.JsonNet;

namespace Flog.Web
{
    public class FlogNancyBootstrapper : AutofacNancyBootstrapper
    {
        IContainer _container;

        public FlogNancyBootstrapper()
        {
        }

        public FlogNancyBootstrapper UseContainer(IContainer containerToUse)
        {
            if (ApplicationContainer != null)
                throw new Exception("The ApplicationContainer already exists! This method should be called before the ApplicationContainer is initialized by Nancy.");
            
            _container = containerToUse;
            
            return this;
        }

        protected override ILifetimeScope GetApplicationContainer()
        {
            return _container ?? base.GetApplicationContainer();
        }

        protected override void ApplicationStartup(ILifetimeScope container, IPipelines pipelines)
        {
            BundleStartup.Setup();
        }

        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("client", @"client")
                );
        }

        protected override NancyInternalConfiguration InternalConfiguration
        {
            get
            {
                return NancyInternalConfiguration.WithOverrides(config =>
                {
                    config.Serializers.Insert(0, typeof(JsonNetSerializer));
                });
            }
        }
    }
}