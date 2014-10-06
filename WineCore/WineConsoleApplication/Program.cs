using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

using WineCore.Data;
using WineCore.Services;

namespace WineConsoleApplication
{

    public class ProcessRunner
    {
        public const string tempXPath = "/response/history/dailysummary/summary";
        public const string weatherUndergroundKey = "bab67802d793f7ff";

        public const int CITY_ID = 1;

        public RegionService rs = new RegionService();

        public void UnitTest_RegionList()
        {
            ServiceResponseMessage request = new ServiceResponseMessage();
            rs.List(request);
            foreach (var region in ((RegionList)request.RequestObject).Regions)
                Console.WriteLine(region.AreaName);
        }

        public void AffixVintage()
        {
            using (WineDBEntities wdb = new WineDBEntities())
            {
                foreach (var day in wdb.WeatherDays.Where(x => x.VintageId == null))
                {
                    if (day.Date.Year == 2010)
                        day.VintageId = 2;
                    if (day.Date.Year == 2011)
                        day.VintageId = 3;
                    if (day.Date.Year == 2012)
                        day.VintageId = 4;
                    if (day.Date.Year == 2013)
                        day.VintageId = 5;
                    if (day.Date.Year == 2014)
                        day.VintageId = 6;
                    if (day.Date.Year == 2009)
                        day.VintageId = 7;
                    

                    Console.WriteLine("Updated " + day.Date.ToShortDateString());
                }

                wdb.SaveChanges();


            }

        }

        public void AssessWeatherData()
        {
            using (WineDBEntities wdb = new WineDBEntities())
            {
                foreach (var day in wdb.WeatherDays.Where(x => x.DegreeDays == null))
                {
                    day.MeanTemperature = (day.HighTemperature + day.LowTemperature) / 2;
                    day.DegreeDays = day.MeanTemperature - 50;
                    if (day.DegreeDays < 0)
                        day.DegreeDays = 0;
                    
                    Console.WriteLine("Updated " + day.Date.ToShortDateString());
                }

                wdb.SaveChanges();


            }

        }

        public void SumCityVintage()
        {
            //find cities / vintages that have more than 360 days but don't have a CityVintage row

            using (WineDBEntities wdb = new WineDBEntities())
            {
                var sumVintages = wdb.WeatherDays.GroupBy(x => x.Date.Year).Select(n => new { n.Key, CityId = n.Max(z => z.CityId), VintageId = n.Max(z => z.VintageId), Count = n.Count(), DegreeDays = n.Sum(y => y.DegreeDays) });

                foreach (var vint in sumVintages)
                {
                    //is this in the db?
                    var thisVInt = wdb.CityVintages.Where(x => x.CityId == vint.CityId && x.VintageId == vint.VintageId).FirstOrDefault();
                    if (thisVInt == null)
                    {
                        //nothing there, so add it to the table
                        using (WineDBEntities wdbSaver = new WineDBEntities()) { 
                        var newVint = new CityVintage() { CityId = vint.CityId, VintageId = vint.VintageId, HeatingDays = vint.DegreeDays.Value };
                        wdbSaver.CityVintages.Add(newVint);
                        wdbSaver.SaveChanges();
                        }

                    }

                }

            //sum heating days, add them to the table

            }
        }

        public void RunMe()
        {
            int nextVintage = 1;
            int runsRemaining = 475;


            while (runsRemaining > 0 && nextVintage > 0)
            {

                //determine a vintage that doesn't have complete data
           
                using (WineDBEntities wdb = new WineDBEntities())
                {
                    var vintages = wdb.Vintages.Where(x => x.Year<DateTime.Now.Year && x.WeatherDays.Count() < 355).FirstOrDefault();
                    if (vintages != null)
                        nextVintage = vintages.VintageId;
                    else
                        nextVintage = 0;

                }

                //start with 1/1 of that vintage

                Console.WriteLine("Gathering data for VintageId " + nextVintage.ToString());
                runsRemaining = runsRemaining - DownloadWeatherData(nextVintage, runsRemaining);

                //do the download

                //run the assessment

                AssessWeatherData();

                //see if there are any runs left for more fun
            }

        }

        public int DownloadWeatherData(int vintageId, int allowedRuns)
        {
            int apiCalls = 1;

            //set the start date by vintage
            using (WineDBEntities wdbVintage = new WineDBEntities())
            {
                var vintage = wdbVintage.Vintages.Find(vintageId);

                DateTime startDate = DateTime.Parse("01/01/" + vintage.Year.ToString());

                
                while (apiCalls < allowedRuns && startDate < DateTime.Parse("12/31/" + vintage.Year.ToString()) && allowedRuns > 0)
                {

                    DateTime curDate = startDate;

                    foreach (var city in vintage.Region.Cities)
                    {

                        string weatherUndergroundAddress = city.WundergroundEndpoint;

                        using (WineDBEntities wdb = new WineDBEntities())
                        {

                            if (wdb.WeatherDays.Where(x => x.CityId == CITY_ID && x.Date == curDate.Date).Count() == 0)
                            {

                                string formattedDate = curDate.ToString("yyyyMMdd");

                                double high = 0;
                                double low = 0;
                                double precip = 0;

                                XmlDocument xmlTemp = new XmlDocument();
                                xmlTemp.Load(string.Format(weatherUndergroundAddress, weatherUndergroundKey, formattedDate));
                                apiCalls++;

                                foreach (XmlNode obs in xmlTemp.SelectNodes(tempXPath))
                                {
                                    foreach (XmlNode node in obs.ChildNodes)
                                    {
                                        Console.WriteLine(node.Name + " - " + node.InnerText);

                                        if (node.Name == "maxtempi")
                                            high = Convert.ToDouble(node.InnerText);
                                        if (node.Name == "mintempi")
                                            low = Convert.ToDouble(node.InnerText);
                                        if (node.Name == "precipi")
                                            if (node.InnerText == "T")
                                                precip = .01;
                                            else
                                                precip = Convert.ToDouble(node.InnerText);

                                    }



                                    WeatherDay wd = new WeatherDay();
                                    wd.CityId = CITY_ID;
                                    wd.Date = curDate;
                                    wd.HighTemperature = high;
                                    wd.LowTemperature = low;
                                    wd.Precipitation = precip;
                                    wd.VintageId = vintageId;
                                    wdb.WeatherDays.Add(wd);

                                    wdb.SaveChanges();
                                }

                                System.Threading.Thread.Sleep(8000);

                            }


                        }

                    }

                    startDate = startDate.AddDays(1);
                    
                }

            }
           
             return apiCalls;
        }

        public void TestReport()
        {
            using (WineDBEntities wdb = new WineDBEntities())
            {
                var cvs = wdb.CityVintages;
                foreach (var cv in cvs)
                {
                    var thisDate = GetEstimatedBudBreak(cv.CityVintageId);
                    Console.WriteLine(cv.Vintage.Region.Name + " " + cv.Vintage.Year + " " + thisDate.ToShortDateString());
                }
            }
        }

        public DateTime GetEstimatedBudBreak(int CityVintage)
        {
            using (WineDBEntities wdb = new WineDBEntities())
            {
                var cv = wdb.CityVintages.Find(CityVintage);
                var weatherDays = cv.City.WeatherDays.Where(x => x.VintageId == cv.VintageId);

                int consecutiveDays = 0;

                foreach (var day in weatherDays.OrderBy(x => x.Date))
                {
                    if (day.DegreeDays > 0)
                        consecutiveDays++;
                    else                    
                        consecutiveDays = 0;
                   if (consecutiveDays == 5 )
                        return day.Date.Date;
                 


                    
                }

                return DateTime.Now;

            }

            
        }

    }

    class Program
    {
        

        public static void Main(string[] args)
        {
            ProcessRunner pr = new ProcessRunner();
            pr.RunMe();
            //pr.UnitTest_RegionList();
            pr.SumCityVintage();

            //pr.TestReport();

            Console.ReadLine();

        }
    }
}
