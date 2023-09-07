using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using weatherStationAPI.Models;

namespace weatherStationAPI.Controllers
{
    public class weatherStationsController : ApiController
    {
        public IEnumerable<weatherStation> Get()
        {
            using (weatherStationDBContext dbContext = new weatherStationDBContext())
            {
                return dbContext.weatherStations.ToList();
            }
        }
        public weatherStation Get(int id)
        {
            using (weatherStationDBContext dbContext = new weatherStationDBContext())
            {
                return dbContext.weatherStations.FirstOrDefault(w => w.id == id);
            }
        }
    }
}