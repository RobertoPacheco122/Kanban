using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Services {
    public interface IBoardService {
        Task<ServiceResponse<Board>> GetSingleBoard (int id);
        Task<ServiceResponse<List<Board>>> GetAllBoards ();
    }
}