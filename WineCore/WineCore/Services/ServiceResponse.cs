using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WineCore.Services
{
    public class ServiceResponseMessage
    {
        public object RequestObject { get; set; }
        public Exception Exception { get; set; }
        public int ElapsedTime { get; set; }
        public object Argument { get; set; }
        public string UserId { get; set; }

        public ServiceResponseMessage()
        {

            

        }

        public ServiceResponseMessage(int arg)
        {

            this.Argument = arg;

        }

    }
}
