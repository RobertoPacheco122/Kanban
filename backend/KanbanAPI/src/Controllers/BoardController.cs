using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.src.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BoardController : ControllerBase {
        private readonly IBoardService _boardService;
        public BoardController(IBoardService boardService) {
            _boardService = boardService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<ServiceResponse<Board>>> GetAllBoards() {
            var response = await _boardService.GetAllBoards();
            if(response.Success == false) return NotFound(response);

            return Ok(response.Data);
        }

        [Authorize]
        [HttpGet("{id}/related")]
        public async Task<ActionResult<ServiceResponse<Board>>> GetBoardRelatedDetails(int id) {
            var response = await _boardService.GetBoardRelatedDetails(id);
            if(response.Success == false) return NotFound(response);

            return Ok(response.Data);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<Board>>> GetSingleBoard(int id) {
            var response = await _boardService.GetSingleBoard(id);
            if(response.Success == false) return NotFound(response);

            return Ok(response.Data);
        }
    }
}