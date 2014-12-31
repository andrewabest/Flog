using System;
using System.Collections.Generic;

namespace Flog.Web.Server.Infrastructure
{
    public interface IDocumentStore
    {
        void Put<T>(T document) where T : IIdentifiable;
        T Get<T>(Guid id);
        IEnumerable<T> GetAll<T>();
    }
}