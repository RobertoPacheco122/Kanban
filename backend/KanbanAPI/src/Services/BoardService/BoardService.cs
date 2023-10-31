using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace KanbanAPI.src.Services {
    public class BoardService : IBoardService {
        private readonly DataContext _context;

        public BoardService(DataContext context) {
            _context = context;
        }

        async public Task<ServiceResponse<List<Board>>> GetAllBoards() {
            var serviceResponse = new ServiceResponse<List<Board>>();
            var boardsList = await _context.Boards.ToListAsync();

            if(boardsList is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Não existem Boards cadastrados";
            } else serviceResponse.Success = true;
            
            serviceResponse.Data = boardsList;

            return serviceResponse;
        }

        public async Task<ServiceResponse<Board>> GetSingleBoard(int id) {
            var serviceResponse = new ServiceResponse<Board>();
            var boardToFind = await _context.Boards.FindAsync(id);

            if(boardToFind is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Board não encontrado";
            } else serviceResponse.Success = true;

            serviceResponse.Data = boardToFind;

            return serviceResponse;
        }
    }
}