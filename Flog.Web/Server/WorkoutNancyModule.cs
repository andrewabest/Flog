using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;
using Nancy;
using Nancy.ModelBinding;

namespace Flog.Web.Server
{
    public class WorkoutNancyModule : NancyModule
    {
        public WorkoutNancyModule() : base("workout")
        {
            Post["/complete", runAsync: true] = CompleteWorkout;
        }

        private async Task<dynamic> CompleteWorkout(dynamic args, CancellationToken token)
        {
            var details = this.Bind<Workout>();

            // Storage!

            return HttpStatusCode.OK;
        }
    }

    public class Workout
    {
        public Guid Id { get; set; }
        public List<Exercise> Exercises { get; set; }
    }

    public class Exercise
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Set> Sets { get; set; } 
    }

    public class Set
    {
        public string Weight { get; set; }
        public string Reps { get; set; }
        public string RPE { get; set; }
    }
}