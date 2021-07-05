using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MessengersParams : PaginationParams
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
    }
}
