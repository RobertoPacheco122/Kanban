using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class Subtask {
        public int Id { get; set; }
        public string? Description { get; set; }
        public bool Done { get; set; } 
        public bool Is_Deleted { get; set; }

        public int TaskItemId { get; set; }
        [JsonIgnore]
        public TaskItem? TaskItem { get; set; }
    }
}