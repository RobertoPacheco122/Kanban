using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.DTOs.List;

namespace KanbanAPI.src.Repositories.ListRepository {
    public interface IListRepository {
        Task<List<List>?> GetAll();
        Task<List?> GetSingle(int id);
        Task<bool> UpdateOne(ListAddUpdateDto list);
    }
}