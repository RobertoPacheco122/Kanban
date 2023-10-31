using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace KanbanAPI.src.Data{
    public class DataContext : DbContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Board> Boards => Set<Board>();
        public DbSet<List> Lists => Set<List>();
        public DbSet<TaskItem> TaskItems => Set<TaskItem>();
        public DbSet<Subtask> Subtasks => Set<Subtask>();
        public DbSet<Tag> Tags => Set<Tag>();
        public DbSet<User> Users => Set<User>();
    }
}