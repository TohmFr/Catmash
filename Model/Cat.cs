using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace catmash.Model
{
    public class Cat
    {
        #region properties
        [System.ComponentModel.DataAnnotations.Key]
        public string Id       { get; set; }
        public long UpVote      { get; set; }
        public long DownVote    { get; set; }
        public long Vote        { get; set; }
        public double Ratio     { get; set; }
        public string UrlImage  { get; set; }
        #endregion

        #region public methods
        public void AddUpVote()
        {
            this.UpVote++;
            this.Vote++;

            this.RefreshRation();
        }

        public void AddDownVote()
        {
            this.DownVote++;
            this.Vote++;

            this.RefreshRation();
        }
        #endregion

        #region private method
        private void RefreshRation()
        {
            this.Ratio = this.UpVote / this.Vote;
        }
        #endregion


    }
}