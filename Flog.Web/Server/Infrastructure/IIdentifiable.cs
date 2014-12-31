using System;

namespace Flog.Web.Server.Infrastructure
{
    public interface IIdentifiable
    {
        Guid Id { get; }
    }
}