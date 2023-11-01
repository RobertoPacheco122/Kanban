using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class Tag {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Color_Hexa { get; set; }

        [JsonIgnore]
        public List<TaskItem>? TaskItems { get; set;}
    }
}