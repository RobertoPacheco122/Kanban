using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KanbanAPI.src.Services.TokenService;
using Microsoft.AspNetCore.Mvc;

namespace KanbanAPI.src.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        [HttpPost]
        public IActionResult Auth(string username, string password){
            if(username == "roberto" || password == "biscoito"){
                var token = TokenService.GenerateToken(new Models.User {Id = 1});
                return Ok(token);
            }

            return BadRequest("username or password invalid");
        }
    }
}