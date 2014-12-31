using System.Collections.Generic;

namespace Flog.Web.Bundling
{
    public static class Bundles
    {
        public static readonly List<BundleFile> Css = new List<BundleFile>
        {
            new BundleFile("~/client/content/site/site.css", minify: true),
            new BundleFile("~/client/content/sweet-alert.css", minify: true),
        };

        public static readonly List<BundleFile> AppScripts = new List<BundleFile>
        {
            new BundleFile("~/client/app/app.js", minify: true),
            new BundleFile("~/client/app/autofocus.js", minify: true),
            new BundleFile("~/client/app/confirmbutton.js", minify: true),
            new BundleFile("~/client/app/showerrors.js", minify: true),

            new BundleFile("~/client/scripts/sweet-alert.min.js"),
            
            new BundleFile("~/client/app/services/workout_service.js", minify: true),

            new BundleFile("~/client/app/features/home/home.js", minify: true),
            new BundleFile("~/client/app/features/home/workout_list.js", minify: true),

            new BundleFile("~/client/app/features/workout_edit/workout_edit.js", minify: true),
            new BundleFile("~/client/app/features/workout_edit/workout_details.js", minify: true),
            new BundleFile("~/client/app/features/workout_edit/exercise.js", minify: true),
            new BundleFile("~/client/app/features/workout_edit/exercise_details.js", minify: true),
            new BundleFile("~/client/app/features/workout_edit/set.js", minify: true),
        };
    }
}