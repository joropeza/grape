using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

using WineCore.Data;

namespace WineConsoleApplication
{

    public class ProcessRunner
    {
        public const string weatherUndergroundAddress = "http://api.wunderground.com/api/{0}/history_{1}/q/OR/Newberg.xml";
        public const string tempXPath = "/response/history/dailysummary/summary";
        public const string weatherUndergroundKey = "bab67802d793f7ff";

        public const int CITY_ID = 1;

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

        public void RunMe()
        {
            //determine a vintage that doesn't have complete data

            //start with 1/1 of that vintage

            //do the download

            //run the assessment

            //see if there are any runs left for more fun

        }

        public int DownloadWeatherData(int vintageId, int allowedRuns)
        {
            DateTime startDate = DateTime.Now.AddMonths(-56);

            int apiCalls = 0;

            while (apiCalls < allowedRuns && startDate < DateTime.Now.AddDays(-1))
            {

                DateTime curDate = startDate;

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
                            wdb.WeatherDays.Add(wd);
                            wdb.SaveChanges();
                        }

                        System.Threading.Thread.Sleep(8000);

                    }


                }

                startDate = startDate.AddDays(1);
            }

            return apiCalls;

        }


    }

    class Program
    {
        

        public static void Main(string[] args)
        {
            ProcessRunner pr = new ProcessRunner();
            pr.DownloadWeatherData();
            //pr.AffixVintage();
            

            Console.ReadLine();

        }
    }
}
