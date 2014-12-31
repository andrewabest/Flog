using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using Flog.Web.Server.Infrastructure;
using Nancy;
using Nancy.ModelBinding;

namespace Flog.Web.Server.Features.Workout
{
    public class WorkoutNancyModule : NancyModule
    {
        public WorkoutNancyModule(IDocumentStore documentStore) : base("workout")
        {
            Post["/complete", runAsync: true] = (args, ct) => CompleteWorkout(documentStore);
        }

        private async Task<dynamic> CompleteWorkout(IDocumentStore documentStore)
        {
            var details = this.Bind<Workout>();

            documentStore.Put(details);

            return HttpStatusCode.OK;
        }
    }
}