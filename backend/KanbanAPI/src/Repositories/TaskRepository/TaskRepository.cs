using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.TaskRepository {
    public class TaskRepository : ITaskRepository {
        private readonly DataContext _context;
        public TaskRepository(DataContext context) {
            _context = context;
        }

        public async Task<List<TaskItem>?> GetAll() {
            var response = await _context.TaskItems.ToListAsync();

            return response;
        }
        public async Task<TaskItem?> GetRelatedDetails(int id) {  
            var response = await _context.TaskItems
                .Include(task => task.Users)
                .Include(task => task.Tags)
                .Include(task => task.Subtasks)
                .FirstOrDefaultAsync(task => task.Id == id);

            return response;
        }
        public async Task<TaskItem?> GetSingle(int id) {
            var response = await _context.TaskItems.FindAsync(id);

            return response;
        }

    }
}