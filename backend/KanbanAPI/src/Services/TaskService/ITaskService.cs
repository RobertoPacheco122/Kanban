using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Services.TaskService {
    public interface ITaskService {
        Task<ServiceResponse<List<TaskItem>>> GetAllTasks();
        Task<ServiceResponse<TaskItem>> GetTaskRelatedDetails(int id);
        Task<ServiceResponse<TaskItem>> GetSingleTask(int id);
    }
}