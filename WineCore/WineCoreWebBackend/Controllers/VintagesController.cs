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
        public int Year { get; set; }
        public int ParkerScore { get; set; }
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
                    lm.Add(new VintageDTO { AreaName = "Willamette Valley", Year = vintage.Year, ParkerScore = vintage.ParkerScore });
                }
                return Request.CreateResponse(HttpStatusCode.OK, lm);
            }
        }

       
    }
}