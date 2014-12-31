using System;
using System.Collections.Generic;
using Flog.Web.Server.Infrastructure;

namespace Flog.Web.Server.Features.Workout
{
    public class Workout : IIdentifiable
    {
        public Workout()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}