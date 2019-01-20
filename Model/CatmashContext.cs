using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace catmash.Model
{
    public class CatmashContext : DbContext
    {
        public DbSet<Cat> Cats { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            //TODO: put in a config file
            optionsBuilder.UseSqlite("Data Source=catmash.db");
        }

        /// <summary>
        /// Constructor 
        /// </summary>
        public CatmashContext() : base()
        {

            var count = 0;
            #region table existance check
            try
            {
                var created = this.Database.EnsureCreated();
                count = this.Cats.Count();
            }
            catch { }
            #endregion

            if (count == 0)
            {
                Initialize().Wait();

            }

        }

        /// <summary>
        /// Initilize from webservice
        /// </summary>
        private async Task Initialize()
        {
            //TODO: put in a config file 
            var wsJson = "https://latelier.co/data/cats.json";

            JObject json;

            #region connect webservice
            using (var client = new HttpClient())
            {

                HttpResponseMessage response = await client.GetAsync(wsJson);
                HttpContent responseContent = response.Content;
                using (var reader = new StreamReader(await responseContent.ReadAsStreamAsync()))
                {
                    String result = await reader.ReadToEndAsync();
                    json = JObject.Parse(result);

                }
            }
            #endregion

            #region populate database
            var query = from j in json.SelectToken("images").Children()
                        select new Cat()
                        {
                            Key = j["id"].Value<String>(),
                            UrlImage = j["url"].Value<String>()
                        };


         
            await this.AddRangeAsync(query);
            #endregion



            await this.SaveChangesAsync();

        }
    }
}
