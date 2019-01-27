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
        public IEnumerable<Cat> Rank(int page = 0)
        {
            IEnumerable<Cat> result = null;
            using (var dbCtx = new CatmashContext())
            {
                result = dbCtx.GetCatWinner(page);
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

        [HttpPost("[action]")]
        public void SaveVote(string WinningCatId, string LosingCatId)
        {
            //check input
            if (String.IsNullOrEmpty(WinningCatId) || String.IsNullOrEmpty(LosingCatId)) return;

            //a little bit overkill to use a om 
            using (var dbCtx = new CatmashContext())
            {
                var winnigCat = dbCtx.GetCat(WinningCatId);
                winnigCat.AddUpVote();

                var LosingCat = dbCtx.GetCat(LosingCatId);
                LosingCat.AddDownVote();

                dbCtx.Cats.Update(winnigCat);
                dbCtx.Cats.Update(LosingCat);

                dbCtx.SaveChanges();
            }
        }
    }
}