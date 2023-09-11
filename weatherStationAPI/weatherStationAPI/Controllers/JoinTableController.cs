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
    public class JoinTableController : ApiController
    {
        //api/JoinTable to show Json 
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult gettables()
        {
            stationDB dbContext = new stationDB();
            List<weatherStationModel> lstation = dbContext.weatherStationModels.ToList();
            List<stationDataModel> ldata = dbContext.stationDataModels.ToList();
            var q = from ws in lstation
                    join ds in ldata on ws.id equals ds.id
                    select new JoinClass
                    {
                        getstationData = ds,
                        getweatherStation = ws
                    };
            return Ok(q);
        }
    }
}
