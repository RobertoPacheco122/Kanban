import SubtaskService from "../../Services/SubtaskService/SubtaskService";
import { Request, Response } from "express";
import taskController from "../Task/TaskController";

class SubtaskController {
  private readonly _SubtaskService: SubtaskService;

  constructor() {
    this._SubtaskService = new SubtaskService();
  }

  public async GetSingleSubtask(request: Request, response: Response) {
    try {
      const subtaskId = +request.params.id;
      if (!subtaskId)
        throw new Error(
          "O parâmetro 'id' da Subtask deve ser informado no body da requisição"
        );
      const subtask = await this._SubtaskService.GetSingleSubtask(subtaskId);
      if (!subtask) throw new Error("Task não encontrado");

      return response.status(200).json(subtask);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a Subtask",
          error: error.message,
        });
    }
  }

  public async GetAllSubtasks(request: Request, response: Response) {
    try {
      const subtasks = await this._SubtaskService.GetAllSubtasks();
      if (!subtasks) throw new Error("Náo existem Subtasks cadastradas");

      return response.status(200).json(subtasks);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a Subtask",
          error: error.message,
        });
    }
  }

  public async UpdateSubtask(request: Request, response: Response) {
    try {
      const { id, action, param } = request.body;
      console.log(id, action, param);
      if (!id || !action || !param)
        throw new Error(
          "É necessário informar o 'id', 'action' e o objeto 'param' no body da requisição"
        );
      const subtask = await this._SubtaskService.UpdateSubtask(
        id,
        action,
        param
      );
      if (!subtask) throw new Error("Não foi possível atualizar a Subtask");

      return response.status(200).json(subtask);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a Subtask",
          error: error.message,
        });
    }
  }

  public async DeleteSubtask(request: Request, response: Response) {
    try {
      const { id } = request.body;
      if (!id)
        throw new Error(
          "É necessário fornecer o parâmetro 'id' da Subtask no body da requisição"
        );
      const subtask = await this._SubtaskService.DeleteSubtask(id);
      if (!subtask) throw new Error("Não foi possível excluir a Subtask");

      return response.status(200).json(subtask);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a Subtask",
          error: error.message,
        });
    }
  }
}

const subtaskController = new SubtaskController();
export default subtaskController;
