using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using weatherStation.Models;

namespace weatherStation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class weatherStationController : ControllerBase
    {
        //initiate connection with SQL server
        private readonly IConfiguration _configuration;
        public weatherStationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getLocation")]

        public Response GetAllLocations()
        {
            Response response = new Response();
            return response;
        }
    }
}
