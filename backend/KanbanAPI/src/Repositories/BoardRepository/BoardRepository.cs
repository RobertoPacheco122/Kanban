using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.BoardRepository {
    public class BoardRepository : IBoardRepository {
        private readonly DataContext _context;
        public BoardRepository(DataContext context) {
            _context = context;
        }

        public async Task<List<Board>?> GetAll() {
            var queryResult = await _context.Boards.ToListAsync();

            return queryResult;
        }

        public async Task<Board?> GetlRelatedDetails(int id) {
            var queryResult = await _context.Boards
                .Include(board => board.Lists)
                    .ThenInclude(list => list.TaskItems)
                        .ThenInclude(list => list.Tags)
                .FirstOrDefaultAsync(board => board.Id == id);

            return queryResult;
        }

        public async Task<Board?> GetSingle(int id) {
            var queryResult = await _context.Boards.FindAsync(id);

            return queryResult;
        }
    }
}