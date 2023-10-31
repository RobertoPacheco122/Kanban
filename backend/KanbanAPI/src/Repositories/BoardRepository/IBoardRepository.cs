using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Repositories.BoardRepository {
    public interface IBoardRepository {
        Task<List<Board>?> GetAll();
        Task<Board?> GetSingle(int id);
    }
}