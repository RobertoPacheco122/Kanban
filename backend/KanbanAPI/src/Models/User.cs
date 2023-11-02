using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class User {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateOnly Created_At { get; set; }
        public DateOnly Due_Date { get; set; }
        public bool Is_Deleted { get; set; }

        [JsonIgnore]
        public List<TaskItem>? TaskItems { get; set; }
    }
}