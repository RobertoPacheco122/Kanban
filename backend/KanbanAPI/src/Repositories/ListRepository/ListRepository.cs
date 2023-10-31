using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.ListRepository {
    public class ListRepository : IListRepository {
        private readonly DataContext _context;
        public ListRepository(DataContext context) {
            _context = context;
        }

        public async Task<List<List>?> GetAll() {
            var queryResult = await _context.Lists.ToListAsync();

            return queryResult;
        }

        public async Task<List?> GetSingle(int id) {
            var queryResult = await _context.Lists.FindAsync(id);

            return queryResult;
        }
    }
}