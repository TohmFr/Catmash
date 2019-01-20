using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace catmash.Model
{
    public class Cat
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string Key       { get; set; }
        public long UpVote      { get; set; }
        public long DownVote    { get; set; }
        public long Vote        { get; set; }
        public double Ratio     { get; set; }
        public string UrlImage  { get; set; }

    }
}