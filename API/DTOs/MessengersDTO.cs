using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MessengersDTO
    {
        public int Id { get; set; }
        public TudaSudaDTO SenderRecipient { get; set; }
        public ICollection<MessageDTO> Messages { get; set; }
    }
}
