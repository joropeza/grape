using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WineCore.Data;

namespace MarketMachineWebBackend.Controllers
{
    public class RegionDTO
    {
        public string AreaName { get; set; }
        public string Country { get; set; }
        public int RegionId { get; set; }
    }

    public class RegionsController : ApiController
    {
        [AcceptVerbs("GET")]
        [Route("Regions")]
        public HttpResponseMessage Regions()
        {
            //returns a list of vintages

            using (WineDBEntities wdb = new WineDBEntities())
            {
                var Regions = wdb.Regions;
                List<RegionDTO> lm = new List<RegionDTO>();
                foreach (var region in Regions)
                {
                    lm.Add(new RegionDTO { AreaName = region.Name, Country = region.Country, RegionId = region.RegionId });
                }
                return Request.CreateResponse(HttpStatusCode.OK, lm);
            }
        }
    }
}
