import TaskService from "../../Services/TaskService/TaskService";
import { Request, Response } from "express";

class TaskController {
  private readonly _TaskService: TaskService;

  constructor() {
    this._TaskService = new TaskService();
  }

  public async GetSingleTask(request: Request, response: Response) {
    try {
      const taskId = +request.params.id;
      if (!taskId)
        throw new Error(
          "O parâmetro 'id' da Task deve ser informado no body da requisição"
        );
      const task = await this._TaskService.GetSingleTask(taskId);
      if (!task) throw new Error("Task não encontrado");

      return response.status(200).json(task);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a Task",
          error: error.message,
        });
    }
  }

  public async GetAllTasks(request: Request, response: Response) {
    try {
      const tasks = await this._TaskService.GetAllTasks();
      if (!tasks) throw new Error("Não existem Tasks cadastradas");

      return response.status(200).json(tasks);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar as Tasks",
          error: error.message,
        });
    }
  }

  public async GetRelatedDetailsForTask(request: Request, response: Response) {
    try {
      const taskId = +request.params.id;
      if (!taskId)
        throw new Error(
          "O parâmetro 'id' da Task deve ser informado nos parâmetros da URL"
        );
      const taskRelatedDetails =
        await this._TaskService.GetRelatedDetailsForTask(taskId);
      if (!taskRelatedDetails)
        throw new Error(
          "Não foi possível pegar os detalhes relacionados a Task"
        );

      return response.status(200).json(taskRelatedDetails);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar as Tasks",
          error: error.message,
        });
    }
  }

  public async UpdateTask(request: Request, response: Response) {
    try {
      const { id, action, param } = request.body;
      if (!id || !action || !param)
        throw new Error(
          "É necessário informar o 'id', 'action' e o objeto 'param' no body da requisição"
        );

      const task = await this._TaskService.UpdateTask(id, action, param);
      if (!task) throw new Error("Não foi possível atualizar a Task");

      return response.status(200).json(task);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar as Tasks",
          error: error.message,
        });
    }
  }

  public async DeleteTask(request: Request, response: Response) {
    try {
      const { id } = request.body;
      if (!id)
        throw new Error(
          "É necessário fornecer o parâmetro 'id' da Task no body da requisição"
        );
      const task = await this._TaskService.DeleteTask(id);
      if (!task) throw new Error("Não foi possível excluir a Task");

      return response.status(200).json(task);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao excluir a Task",
          error: error.message,
        });
    }
  }
}

const taskController = new TaskController();
export default taskController;
