using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WineCore.Data;

namespace MarketMachineWebBackend.Controllers
{
    public class VintageDTO
    {
        public string AreaName { get; set; }
        public string Country { get; set; }
        public int Year { get; set; }
        public int ParkerScore { get; set; }
        public List<VintageDayDTO> Days { get; set; }
    }

    public class VintageDayDTO
    {
        public string Date { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double DegreeDays { get; set; }
    }

    public class VintagesController : ApiController
    {
        [AcceptVerbs("GET")]
        [Route("Vintages")]
        public HttpResponseMessage Vintages()
        {
            //returns a list of vintages

            using (WineDBEntities wdb = new WineDBEntities())
            {
                var Vintages = wdb.Vintages;
                List<VintageDTO> lm = new List<VintageDTO>();
                foreach (var vintage in Vintages)
                {
                    lm.Add(new VintageDTO { AreaName = "Willamette Valley", Year = vintage.Year, ParkerScore = vintage.ParkerScore, Country = "Oregon" });
                }
                return Request.CreateResponse(HttpStatusCode.OK, lm);
            }
        }

        [AcceptVerbs("GET")]
        [Route("Vintages/{VintageId}")]
        public HttpResponseMessage Vintages(int VintageId)
        {
            //returns a list of vintages

            using (WineDBEntities wdb = new WineDBEntities())
            {
                var vintage = wdb.Vintages.Find(VintageId);
                VintageDTO lm = new VintageDTO() { AreaName = "Willamette Valley", Year = vintage.Year, ParkerScore = vintage.ParkerScore, Country = "Oregon" };

                lm.Days = new List<VintageDayDTO>();
                foreach (var day in vintage.WeatherDays)
                {
                    lm.Days.Add(new VintageDayDTO { Date = day.Date.ToShortDateString(), High = day.HighTemperature, Low = day.LowTemperature, DegreeDays = day.DegreeDays.Value });
                }
                
                return Request.CreateResponse(HttpStatusCode.OK, lm);
            }
        }

       
    }
}