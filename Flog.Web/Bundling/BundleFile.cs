namespace Flog.Web.Bundling
{
    public class BundleFile
    {
        public BundleFile(string url, bool minify = false)
        {
            Url = url;
            Minify = minify;
        }

        public string Url { get; set; }

        public bool Minify { get; set; }
    }
}