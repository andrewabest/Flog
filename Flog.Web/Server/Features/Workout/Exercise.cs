using System;
using System.Collections.Generic;

namespace Flog.Web.Server.Features.Workout
{
    public class Exercise
    {
        public Exercise()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Set> Sets { get; set; } 
    }
}