//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WineCore.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Region
    {
        public Region()
        {
            this.Vintages = new HashSet<Vintage>();
            this.Cities = new HashSet<City>();
        }
    
        public int RegionId { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
    
        public virtual ICollection<Vintage> Vintages { get; set; }
        public virtual ICollection<City> Cities { get; set; }
    }
}
