using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using weatherStationAPI.Models;

namespace weatherStationAPI.Controllers
{
    public class stationDatasController : ApiController
    {
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        //api/stationDatas to show Json 
        public IEnumerable<stationData> Get()
        {
            using (stationDataDBContext dbContext = new stationDataDBContext())
            {
                return dbContext.stationDatas.ToList();
            }
        }

        public stationData Get(int id)
        {
            using (stationDataDBContext dbContext = new stationDataDBContext())
            {
                return dbContext.stationDatas.FirstOrDefault(w => w.id == id);
            }
        }
    }
}
