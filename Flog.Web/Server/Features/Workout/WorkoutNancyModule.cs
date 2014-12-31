using System.Collections;
using System.Linq;
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
            Get["/all", runAsync: true] = (args, ct) => GetAllWorkouts(documentStore);
        }

        private async Task<dynamic> CompleteWorkout(IDocumentStore documentStore)
        {
            var details = this.Bind<Workout>();

            documentStore.Put(details);

            return HttpStatusCode.OK;
        }

        private async Task<dynamic> GetAllWorkouts(IDocumentStore documentStore)
        {
            var workouts = documentStore.GetAll<Workout>().ToArray();

            Thread.Sleep(3000); // LATENCY MONKEY 

            return Response.AsJson(workouts);
        }
    }
}