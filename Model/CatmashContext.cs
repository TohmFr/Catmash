﻿using System;
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
        #region public DBSet
        public DbSet<Cat> Cats { get; set; }
        #endregion

        #region private static
        //avoid multi checking 
        private static Lazy<bool> DatabaseInitialized;
        #endregion

        static CatmashContext()
        {
            //singleton 
            DatabaseInitialized = new Lazy<bool>(() =>
            {
                bool initialized = false;
                using(var dbCtx = new CatmashContext(true))
                {
                    dbCtx.Database.EnsureCreated();
                    initialized = dbCtx.Cats.Count() > 0;
                }               

                return initialized;
            });
        }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //TODO: put in a config file
            optionsBuilder.UseSqlite("Data Source=catmash.db");
        }

        /// <summary>
        /// Constructor 
        /// </summary>
        public CatmashContext(bool WithoutCheckInitialized = false) : base()
        {
            if ((!WithoutCheckInitialized) &&(!DatabaseInitialized.Value))
            {
                Initialize().Wait();
            }

        }

        #region methods
        /// <summary>
        /// Get a random cat
        /// </summary>
        /// <param name="NotThisCat">Execpt this cat</param>
        /// <returns></returns>
        public Cat GetRandownCat(Cat NotThisCat = null)
        {
            var rand = new Random();
            var nbRemove = (NotThisCat==null)? 1 : 0;
            var randomCat = this.Cats.OrderBy(cat => cat.Id)
                            .Skip((int)((this.Cats.Count() - nbRemove) * rand.NextDouble()))
                            .Where(cat => cat.Id != ((NotThisCat == null) ? string.Empty : NotThisCat.Id))
                            .Take(1)
                            .FirstOrDefault();

            return randomCat;


        }

        /// <summary>
        /// Get a cat by id
        /// </summary>
        /// <param name="Id">Id of cat</param>
        /// <returns></returns>
        public Cat GetCat(string Id)
        {
            return  this.Cats.Where(c => c.Id == Id).Take(1).FirstOrDefault();
            
        }
        #endregion


        #region private methods
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
                            Id = j["id"].Value<String>(),
                            UrlImage = j["url"].Value<String>()
                        };


         
            await this.AddRangeAsync(query);
            #endregion



            await this.SaveChangesAsync();

        }

        #endregion

        


    }
}
