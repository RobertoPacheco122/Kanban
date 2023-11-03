using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.Services {
    public interface IBoardService {
        Task<ServiceResponse<List<Board>>> GetAllBoards ();
        Task<ServiceResponse<Board>> GetBoardRelatedDetails (int id);
        Task<ServiceResponse<Board>> GetSingleBoard (int id);
    }
}