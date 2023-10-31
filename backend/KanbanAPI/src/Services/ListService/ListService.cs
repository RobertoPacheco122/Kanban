using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Repositories.ListRepository;

namespace KanbanAPI.src.Services.ListService {
    public class ListService : IListService {
        private readonly IListRepository _listRepository;
        public ListService(IListRepository listRepository) {
            _listRepository = listRepository;
        }

        public async Task<ServiceResponse<List<List>>> GetAllLists() {
            var serviceResponse = new ServiceResponse<List<List>>();
            var listsList = await _listRepository.GetAll();

            if(listsList?.Count == 0) {
                serviceResponse.Success = false;
                serviceResponse.Message = "Não existem Lists cadastradas";
            } else serviceResponse.Data = listsList;

            serviceResponse.Data = listsList;

            return serviceResponse;
        }

        public async Task<ServiceResponse<List>> GetSingleList(int id) {
            var serviceResponse = new ServiceResponse<List>();
            var listToFind = await _listRepository.GetSingle(id);

            if(listToFind is null) {
                serviceResponse.Success = false;
                serviceResponse.Message = "List não encontrada";
            } else serviceResponse.Success = true;

            serviceResponse.Data = listToFind;

            return serviceResponse;
        }
    }
}