using System.Collections.Generic;

namespace Flog.Web.Bundling
{
    public static class Bundles
    {
        public static readonly List<BundleFile> Css = new List<BundleFile>
        {
            new BundleFile("~/client/content/site/site.css", minify: true),
        };

        public static readonly List<BundleFile> AppScripts = new List<BundleFile>
        {
            new BundleFile("~/client/app/app.js", minify: true),
            new BundleFile("~/client/app/features/workout_list.js", minify: true),
        };
    }
}