using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.ListRepository {
    public interface IListRepository {
        Task<List<List>?> GetAll();
        Task<List?> GetSingle(int id);
    }
}