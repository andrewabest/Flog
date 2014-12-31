using Autofac;
using Flog.Web.Server.Features.Workout;
using Flog.Web.Server.Infrastructure;

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