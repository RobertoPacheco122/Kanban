using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class Board {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool Is_deleted { get; set; }
        public List<List>? Lists { get; set;}
    }
}