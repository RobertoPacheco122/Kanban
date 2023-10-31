using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Repositories.BoardRepository;


namespace KanbanAPI.src.Services {
    public class BoardService : IBoardService {
        private readonly IBoardRepository _boardRepository;

        public BoardService(IBoardRepository boardRepository) {
            _boardRepository = boardRepository;
        }

        async public Task<ServiceResponse<List<Board>>> GetAllBoards() {
            var serviceResponse = new ServiceResponse<List<Board>>();
            var boardsList = await _boardRepository.GetAll();

            if(boardsList is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Não existem Boards cadastrados";
            } else serviceResponse.Success = true;
            
            serviceResponse.Data = boardsList;

            return serviceResponse;
        }

        public async Task<ServiceResponse<Board>> GetSingleBoard(int id) {
            var serviceResponse = new ServiceResponse<Board>();
            var boardToFind = await _boardRepository.GetSingle(id);

            if(boardToFind is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Board não encontrado";
            } else serviceResponse.Success = true;

            serviceResponse.Data = boardToFind;

            return serviceResponse;
        }
    }
}