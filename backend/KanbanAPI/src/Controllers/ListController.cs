using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Services.ListService;
using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.src.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase {
        private readonly IListService _listService;
        public ListController(IListService listService) {
            _listService = listService;
        }
           
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List>>> GetAllBoards() {
            var response = await _listService.GetAllLists();
            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<List>>> GetSingleBoard(int id) {
            var response = await _listService.GetSingleList(id);
            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }
    }
}