using System.Collections.Generic;
using SquishIt.Framework;
using SquishIt.Framework.CSS;
using SquishIt.Framework.JavaScript;

namespace Flog.Web.Bundling
{
    public static class BundleStartup
    {
        private static JavaScriptBundle BuildJavaScriptBundle(List<BundleFile> files)
        {
            var bundle = Bundle.JavaScript();

            foreach (var item in files)
            {
                var url = item.Url;

                if (item.Minify)
                {
                    bundle.Add(url);
                }
                else
                {
                    bundle.AddMinified(url);
                }
            }

            return bundle;
        }

        private static CSSBundle BuildCssBundle(List<BundleFile> files)
        {
            var bundle = Bundle.Css();

            foreach (var item in files)
            {
                var url = item.Url;

                if (item.Minify)
                {
                    bundle.Add(url);
                }
                else
                {
                    bundle.AddMinified(url);
                }
            }

            return bundle;
        }

        public static void Setup()
        {
            // Defaults
            SquishIt.Framework.Configuration.Instance.JavascriptMimeType = "application/x-javascript";
            // Allow GZip in IIS
            SquishIt.Framework.Configuration.Instance.UseHashAsVirtualDirectoryInvalidationStrategy();
            SquishIt.Framework.Configuration.Instance.UseDefaultOutputBaseHref("/");

            #if DEBUG
            BuildCssBundle(Bundles.Css).ForceDebug().AsNamed("css-debug", "");
            BuildJavaScriptBundle(Bundles.BootstrappingScripts).ForceDebug().AsNamed("app-bootstrappingjs-debug", "");
            BuildJavaScriptBundle(Bundles.AppScripts).ForceDebug().AsNamed("app-js-debug", "");
            BuildJavaScriptBundle(Bundles.ReactAppScripts).ForceDebug().AsNamed("app-reactjs-debug", "");
            #else
            BuildCssBundle(Bundles.Css).ForceRelease().AsCached("css", "~/assets/css/#/css");
            BuildJavaScriptBundle(Bundles.BootstrappingScripts).ForceRelease().AsCached("app-bootstrappingjs", "~/assets/js/#/app-bootstrappingjs");
            BuildJavaScriptBundle(Bundles.AppScripts).ForceRelease().AsCached("app-js", "~/assets/js/#/app-js");
#endif
        }
    }
}