using System;
using System.Collections.Generic;
using Flog.Web.Server.Infrastructure;

namespace Flog.Web.Server.Features.Workout
{
    public class Workout : IIdentifiable
    {
        public Guid Id { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}