using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KanbanAPI.src.DTOs.List {
    public record struct ListAddUpdateDto (int Id, string Name, bool Is_deleted, int BoardId);
}