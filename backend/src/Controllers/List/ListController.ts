import ListService from "../../Services/ListService/ListService";
import { Request, Response } from "express";

class ListController {
  private readonly _ListService: ListService;

  constructor() {
    this._ListService = new ListService();
  }

  public async GetSingleList(request: Request, response: Response) {
    try {
      const listId = +request.params.id;
      if (!listId)
        throw new Error(
          "O id da List deve ser informado nos parâmetros da URL."
        );
      const list = await this._ListService.GetSingleList(listId);
      if (!list) throw new Error("List não encontrado");

      return response.status(200).json(list);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar a List",
          error: error.message,
        });
    }
  }

  public async GetAllLists(request: Request, response: Response) {
    try {
      const lists = await this._ListService.GetAllLists();
      if (!lists) throw new Error("Não existem Lists cadastrados");

      return response.status(200).json(lists);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar as Lists",
          error: error.message,
        });
    }
  }

  public async AddList(request: Request, response: Response) {
    try {
      const { name, id_board } = request.body;
      if (!name || !id_board)
        throw new Error(
          "É necessário fornecer os parâmetros 'name' e 'id_board' no body da requisição"
        );
      const newList = await this._ListService.AddList(name, id_board);
      if (!newList) throw new Error("Não foi possível cadastrar a List");

      return response.status(200).json(newList);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao adicionar a List",
          error: error.message,
        });
    }
  }

  public async UpdateList(request: Request, response: Response) {
    try {
      const { id, name, id_board } = request.body;
      if (!id || !name || !id_board)
        throw new Error(
          "É necessário fornecer os parâmetros 'id' 'name' e 'id_board' de List no body da requisição"
        );
      const list = await this._ListService.UpdateList(id, name, id_board);
      if (!list) throw new Error("Não foi possível cadastrar a List");

      return response.status(200).json(list);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao atualizar a List",
          error: error.message,
        });
    }
  }

  public async DeleteList(request: Request, response: Response) {
    try {
      const { id } = request.body;
      if (!id)
        throw new Error(
          "É necessário fornecer o parâmetros 'id' de List no body da requisição"
        );
      const list = await this._ListService.DeleteList(id);
      if (!list) throw new Error("Não foi possível excluir a List");

      return response.status(200).json(list);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao excluir a List",
          error: error.message,
        });
    }
  }
}

const listController = new ListController();

export default listController;
