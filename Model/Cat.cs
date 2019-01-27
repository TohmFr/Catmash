using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace catmash.Model
{
    public class Cat
    {
        #region properties
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }


        //id from webservice
        public string Key       { get; set; }


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
            this.Ratio = (double)this.UpVote / (double) this.Vote ;
        }
        #endregion


    }
}