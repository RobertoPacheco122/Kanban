using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.DTOs.List;

namespace KanbanAPI.src.Services.ListService {
    public interface IListService {
        Task<ServiceResponse<List<List>>> GetAllLists();
        Task<ServiceResponse<List>> GetSingleList(int id); 
        Task<ServiceResponse<bool>> UpdateSingleList(ListAddUpdateDto list);
    }
}