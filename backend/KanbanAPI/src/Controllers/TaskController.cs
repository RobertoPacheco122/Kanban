using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Services.TaskService;
using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.src.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<TaskItem>>>> GetAllTasks() {
            var response = await _taskService.GetAllTasks();

            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<TaskItem>>> GetSingleTask(int id) {
            var response = await _taskService.GetSingleTask(id);

            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }

        [HttpGet("{id}/related")]
        public async Task<ActionResult<ServiceResponse<TaskItem>>> GetTaskRelatedDetails(int id) {
            var response = await _taskService.GetTaskRelatedDetails(id);

            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }
    }
}