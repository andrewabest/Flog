using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace Flog.Web.Server.Infrastructure
{
    public class FileSystemDocumentStore : IDocumentStore
    {
        public void Put<T>(T document) where T : IIdentifiable
        {
            var storagePath = GetStoragePath(typeof(T), document.Id);

            File.WriteAllText(storagePath, JsonConvert.SerializeObject(document));
        }

        public T Get<T>(Guid id)
        {
            var storagePath = GetStoragePath(typeof(T), id);

            if (File.Exists(storagePath))
            {
                return JsonConvert.DeserializeObject<T>(File.ReadAllText(storagePath));
            }

            return default(T);
        }

        public IEnumerable<T> GetAll<T>()
        {
            var storageLocation = GetStorageLocation();

            return 
                Directory
                    .EnumerateFiles(storageLocation, typeof(T).Name + "*", SearchOption.TopDirectoryOnly)
                    .Select(storagePath => JsonConvert.DeserializeObject<T>(File.ReadAllText(storagePath)))
                    .ToArray();
        }

        private static string GetStoragePath(Type documentType, Guid id) 
        {
            var storageLocation = GetStorageLocation();

            var fileName = documentType.Name + "-" + id;

            var storagePath = Path.Combine(storageLocation, fileName);

            return storagePath;
        }

        private static string GetStorageLocation()
        {
            var path = Path.Combine(
                Environment.GetFolderPath(
                    Environment.SpecialFolder.LocalApplicationData,
                    Environment.SpecialFolderOption.Create), 
                "Flog");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return path;
        }
    }
}