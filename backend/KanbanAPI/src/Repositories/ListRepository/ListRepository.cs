using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.DTOs.List;

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

        public async Task<bool> UpdateOne(ListAddUpdateDto list){
            var listToUpdate = await GetSingle(list.Id);
            if(listToUpdate is null) return false;

            listToUpdate.Name = list.Name;
            listToUpdate.Is_deleted = list.Is_deleted;
            listToUpdate.BoardId = list.BoardId;

            await _context.SaveChangesAsync();

            return true;
        }
    }
}