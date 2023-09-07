using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace weatherStation.Models
{
    //Data access layer
    public class DAL
    {
        public Response GetAllLocations(SqlConnection connection)
        {
            Response response = new Response();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM weatherStation",connection);
            DataTable dt = new DataTable();
            List<weatherStation> lstweatherStation = new List<weatherStation>();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    weatherStation weatherStation = new weatherStation();
                    weatherStation.id = Convert.ToInt32(dt.Rows[i]["id"]);
                    weatherStation.ws_name = Convert.ToString(dt.Rows[i]["ws_name"]);
                    weatherStation.site = Convert.ToString(dt.Rows[i]["site"]);
                    weatherStation.portfolio = Convert.ToString(dt.Rows[i]["portfolio"]);
                    weatherStation.state = Convert.ToString(dt.Rows[i]["state"]);
                    weatherStation.latitude = Convert.ToSingle(dt.Rows[i]["latitude"]);
                    weatherStation.longitude = Convert.ToSingle(dt.Rows[i]["longitude"]);
                    lstweatherStation.Add(weatherStation);
                }
            }
            if (lstweatherStation.Count > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Data found";
                response.listweatherStation = lstweatherStation;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Data found";
                response.listweatherStation = null;
            }
            return response;
        }
    }
}
