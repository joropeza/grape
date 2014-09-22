using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using WineCore.Data;

namespace WineCore.Services
{
    [DataContract]
    public class RegionList
    {
        [DataMember]
        public string ListName;
        [DataMember]
        public List<RegionDTO> Regions;
    }

    public class RegionDTO
    {
        public string AreaName { get; set; }
        public string Country { get; set; }
        public int RegionId { get; set; }
        public int OldestVintage { get; set; }
    }


    public abstract class ICoreService
    {
        public ServiceResponseMessage request;
    }

    public class RegionService : ICoreService
    {
        public ServiceResponseMessage List(ServiceResponseMessage newRequest)
        {
            this.request = newRequest;
            using (WineDBEntities wdb = new WineDBEntities()) {

                var regions = wdb.Regions;
                RegionList rl = new RegionList();

                rl.Regions = new List<RegionDTO>();

                foreach (var rv in regions)
            {
                rl.Regions.Add(new RegionDTO() { RegionId = rv.RegionId, AreaName = rv.Name, Country = rv.Country, OldestVintage = rv.Vintages.Min(x=>x.Year)});
            }

            request.RequestObject = rl;
            //request.ElapsedTime = sw.Elapsed.Milliseconds;

            return request;
            }

        }
    }
}
