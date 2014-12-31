using System.Globalization;
using System.Reflection;
using System.Text;
using Autofac;
using Flog.Web.Server.Features.Workout;
using Flog.Web.Server.Infrastructure;
using Module = Autofac.Module;

namespace Flog.Web.AutofacModules
{
    public class StorageModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<FileSystemDocumentStore>()
                .As<IDocumentStore>()
                .SingleInstance();
        }
    }
}