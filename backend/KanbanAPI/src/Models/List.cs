using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class List {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool Is_deleted { get; set; }

        public int BoardId { get; set; }
        public Board? Board { get; set; }
        public List<TaskItem>? TaskItems {get; set;}
    }
}