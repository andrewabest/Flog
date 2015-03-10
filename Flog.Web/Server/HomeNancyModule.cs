using System;
using Nancy;
using SquishIt.Framework;

namespace Flog.Web.Server
{
    public class HomeNancyModule : NancyModule
    {
        public HomeNancyModule()
        {
            Get["/"] = _ => RenderView();
            Get["/React"] = _ => RenderReactView();
            Get["/Error"] = _ => { throw new Exception("Hello world!"); };
            Get["/NotFound"] = _ => new NotFoundResponse();
            Get["/Unauthorized"] = _ => new Response().WithStatusCode(HttpStatusCode.Unauthorized);
            Get["/Forbidden"] = _ => new Response().WithStatusCode(HttpStatusCode.Forbidden);
        }

        private object RenderView()
        {
            #if DEBUG
            var css = Bundle.Css().RenderNamed("css-debug");
            var bootstrappingScripts = Bundle.JavaScript().RenderNamed("app-bootstrappingjs-debug");
            var appScripts = Bundle.JavaScript().RenderNamed("app-js-debug");
            #else
            var css = Bundle.Css().RenderCachedAssetTag("css");
            var bootstrappingScripts = Bundle.JavaScript().RenderCachedAssetTag("app-bootstrappingjs");
            var appScripts = Bundle.JavaScript().RenderCachedAssetTag("app-js");
            #endif

            return View[@"client/index.html", new
            {
                BootstrappingScripts = bootstrappingScripts,
                Scripts = appScripts,
                Css = css
            }]
            .WithHeader("Content-Type", "text/html; charset=utf-8")
            .WithHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            .WithHeader("Pragma", "no-cache")
            .WithHeader("Expires", "0");
        }
        
        private object RenderReactView()
        {
            #if DEBUG
            var css = Bundle.Css().RenderNamed("css-debug");
            var bootstrappingScripts = Bundle.JavaScript().RenderNamed("app-bootstrappingjs-debug");
            var appScripts = Bundle.JavaScript().RenderNamed("app-reactjs-debug");
            #else
            var css = Bundle.Css().RenderCachedAssetTag("css");
            var bootstrappingScripts = Bundle.JavaScript().RenderCachedAssetTag("app-bootstrappingjs");
            var appScripts = Bundle.JavaScript().RenderCachedAssetTag("app-reactjs");
            #endif

            return View[@"client/react-index.html", new
            {
                BootstrappingScripts = bootstrappingScripts,
                Scripts = appScripts,
                Css = css
            }]
            .WithHeader("Content-Type", "text/html; charset=utf-8")
            .WithHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            .WithHeader("Pragma", "no-cache")
            .WithHeader("Expires", "0");
        }
    }
}