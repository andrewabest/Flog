﻿using System;
using System.Collections;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Flog.Web.Server.Infrastructure;
using Nancy;
using Nancy.ModelBinding;
using Nancy.Security;

namespace Flog.Web.Server.Features.Workout
{
    public class WorkoutNancyModule : NancyModule
    {
        public WorkoutNancyModule(IDocumentStore documentStore) : base("workout")
        {
            this.RequiresAuthentication();

            Post["complete", runAsync: true] = (args, ct) => CompleteWorkout(documentStore);
            Get["all", runAsync: true] = (args, ct) => GetAllWorkouts(documentStore);
            Get["{workoutId}", runAsync: true] = (args, ct) => GetWorkout((string)args.workoutId, documentStore);
        }

        private async Task<dynamic> CompleteWorkout(IDocumentStore documentStore)
        {
            var details = this.Bind<Workout>();

            documentStore.Put(details);

            return Response.AsJson(string.Empty, HttpStatusCode.OK);
        }

        private async Task<dynamic> GetAllWorkouts(IDocumentStore documentStore)
        {
            var workouts = documentStore.GetAll<Workout>().ToArray();

            Thread.Sleep(1000); // LATENCY MONKEY 

            return Response.AsJson(workouts);
        }
        
        private async Task<dynamic> GetWorkout(string workoutId, IDocumentStore documentStore)
        {
            var workout = documentStore.Get<Workout>(Guid.Parse(workoutId));

            Thread.Sleep(1000); // LATENCY MONKEY 

            return Response.AsJson(workout);
        }
    }
}