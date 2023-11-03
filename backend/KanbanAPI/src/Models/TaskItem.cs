using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Models {
    public class TaskItem {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string Priority { get; set; } = "Low Priority";
        public bool Done { get; set; }
        public bool Is_Deleted { get; set; }
        public DateOnly Created_At { get; set; }
        public DateOnly Due_Date { get; set; }

        public int ListId { get; set; }
        [JsonIgnore]
        public List? List { get; set; }
        public List<User>? Users { get; set; }
        public List<Tag>? Tags { get; set; }
        public List<Subtask>? Subtasks { get; set; }
    }
}