using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Repositories.TaskRepository;

namespace KanbanAPI.src.Services.TaskService {
    public class TaskService : ITaskService {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository) {
            _taskRepository = taskRepository;
        }

        public async Task<ServiceResponse<List<TaskItem>>> GetAllTasks() {
            var serviceResponse = new ServiceResponse<List<TaskItem>>();
            var tasksList = await _taskRepository.GetAll();

            if(tasksList?.Count == 0) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Não existem Tasks cadastradas";
            } else serviceResponse.Data = tasksList;

            serviceResponse.Data = tasksList;

            return serviceResponse;
        }
        public async Task<ServiceResponse<TaskItem>> GetTaskRelatedDetails(int id) {
            var serviceResponse = new ServiceResponse<TaskItem>();
            var task = await _taskRepository.GetRelatedDetails(id);

            if(task is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Task não encontrada";
            } else serviceResponse.Data = task;

            serviceResponse.Data = task;

            return serviceResponse;
        }
        public async Task<ServiceResponse<TaskItem>> GetSingleTask(int id) {
            var serviceResponse = new ServiceResponse<TaskItem>();
            var taskToFind = await _taskRepository.GetSingle(id);

            if(taskToFind is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "List não encontrada";
            } else serviceResponse.Success = true;

            serviceResponse.Data = taskToFind;

            return serviceResponse;
        }
    }
}