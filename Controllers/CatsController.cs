using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace catmash.Controllers
{
    [Route("api/[controller]")]
    public class CatsController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Cats> Rank(int page =0)
        {
            //test Value
            var cats = new List<Cats>
            {
                new Cats()
                {
                    ImageUrl = "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg",
                    Key = "MTgwODA3MA"
                },
                new Cats()
                {
                    ImageUrl = "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg",
                    Key = "tt"
                }
            };
            return cats;
        }
     


        public class Cats
        {
            public string ImageUrl { get; set; }
            public string Key      { get; set; }         
        }

        
    }
}