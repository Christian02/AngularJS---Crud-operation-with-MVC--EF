using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace CrudAngular.Models
{
    public class Context: DbContext
    {
        public DbSet<CrudAngular.Models.Player> Players { get; set; }
      
    }
}