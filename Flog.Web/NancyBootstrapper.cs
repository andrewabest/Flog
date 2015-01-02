using System;
using System.Collections.Generic;
using System.Security.Claims;
using Autofac;
using Flog.Web.Bundling;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Bootstrappers.Autofac;
using Nancy.Conventions;
using Nancy.ErrorHandling;
using Nancy.Owin;
using Nancy.Responses;
using Nancy.Serialization.JsonNet;

namespace Flog.Web
{
    public class FlogNancyBootstrapper : AutofacNancyBootstrapper
    {
        IContainer _container;
        Func<NancyContext, ClaimsPrincipal> _claimsPrincipalResolver;

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

            // Ensure that before each request is processed we scrape any identity stuffed into the environment dictionary out and stuff it into the Context CurrentUser
            // ಠ_ಠ
            pipelines.BeforeRequest +=
                ctx =>
                {
                    
                    var principal = ResolveClaimsPrincipal(ctx);
                    if (principal != null && principal.Identity.IsAuthenticated)
                    {
                        var claimsIdentity = (ClaimsIdentity)principal.Identity;
                        ctx.CurrentUser = new UserIdentity(claimsIdentity);
                    }

                    // Otherwise continue with processing this request
                    return null;
                };
        }

        private ClaimsPrincipal ResolveClaimsPrincipal(NancyContext ctx)
        {
            object owinEnvironmentObject;
            if (ctx.Items.TryGetValue(NancyMiddleware.RequestEnvironmentKey, out owinEnvironmentObject))
            {
                var owinEnvironment = (IDictionary<string, object>)owinEnvironmentObject;
                object userObject;
                if (owinEnvironment != null && owinEnvironment.TryGetValue("server.User", out userObject))
                {
                    return (ClaimsPrincipal)userObject;
                }
            }

            return null;
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