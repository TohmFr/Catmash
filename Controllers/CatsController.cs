using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using catmash.Model;
namespace catmash.Controllers
{
    [Route("api/[controller]")]
    public class CatsController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Cat> Rank(int page =0)
        {

            IEnumerable<Cat> result =null;
            using (var dbCtx= new CatmashContext())
            {
                result = dbCtx.Cats.ToList();

            }
           
            return result;
        }

        [HttpGet("[action]")]
        public Cat[] GetTwoRandowCats()
        {
            Cat[] cats = new Cat[2];

            using (var dbCtx = new CatmashContext())
            {
                var firstCat = dbCtx.GetRandownCat();
                var secondCat = dbCtx.GetRandownCat(firstCat);
                cats[0] = firstCat;
                cats[1] = secondCat;
            }
            return cats;
        }


        
    }
}