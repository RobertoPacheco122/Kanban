using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.src.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BoardController : ControllerBase {
        private readonly IBoardService _boardService;
        public BoardController(IBoardService boardService) {
            _boardService = boardService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<Board>>> GetAllBoards() {
            var response = await _boardService.GetAllBoards();
            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Board>>> GetSingleBoard(int id) {
            var response = await _boardService.GetSingleBoard(id);
            if(response.Success == false) return NotFound(response);

            return Ok(response);
        }
    }
}