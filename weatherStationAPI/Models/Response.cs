using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weatherStation.Models
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public weatherStation weatherStation { get; set; }
        public List<weatherStation> listweatherStation { get; set; }

    }
}
