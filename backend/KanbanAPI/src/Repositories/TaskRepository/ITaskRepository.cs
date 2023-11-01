using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.TaskRepository {
    public interface ITaskRepository {
        Task<List<TaskItem>?> GetAll();
        Task<TaskItem?> GetRelatedDetails(int id);
        Task<TaskItem?> GetSingle(int id);
    }
}