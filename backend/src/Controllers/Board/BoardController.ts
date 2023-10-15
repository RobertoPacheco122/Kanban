import BoardService from "../../Services/BoardService/BoardService";
import { Request, Response } from "express";

class BoardController {
  private readonly boardService: BoardService;

  constructor() {
    this.boardService = new BoardService();
  }

  public async GetSingleBoard(request: Request, response: Response) {
    try {
      const boardId = +request.params.id;
      if (!boardId)
        throw new Error(
          "O id do Board deve ser informado no body da requisição."
        );
      const board = await this.boardService.GetSingleBoard(boardId);
      if (!board) throw new Error("Board não encontrado");

      return response.status(200).json(board);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar o Board",
          error: error.message,
        });
    }
  }

  public async GetAllBoards(request: Request, response: Response) {
    try {
      const boards = await this.boardService.GetAllBoards();
      if (!boards) throw new Error("Não existem Boards cadastrados");

      return response.status(200).json(boards);
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar o Board",
          error: error.message,
        });
    }
  }

  public async AddBoard(request: Request, response: Response) {
    try {
      const { name } = request.body;
      if (!name)
        throw new Error(
          "É necessário fornecer o parâmetro 'name' do Board no body da requisição"
        );
      const board = await this.boardService.AddBoard(name);
      if (!board) throw new Error("Não foi possível cadastrar o Board");

      return response.status(200).json(board);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao adicionar o Board",
          error: error.message,
        });
    }
  }

  public async GetBoardListsAndTasks(request: Request, response: Response) {
    try {
      const boardId = +request.params.id;
      if (!boardId)
        throw new Error(
          "O id do Board deve ser informado no body da requisição."
        );
      const boardsListsAndTasks =
        await this.boardService.GetBoardListsAndTasks(boardId);
      if (!boardsListsAndTasks)
        throw new Error("Erro ao byscar os Lists e Taks do Board");

      return response.status(200).json(boardsListsAndTasks);
    } catch (error) {
      if (error instanceof Error)
        return response.status(400).json({
          message: "Ocorreu um erro ao buscar os Lists e Tasks do Board",
          error: error.message,
        });
    }
  }
}

const boardController = new BoardController();
export default boardController;
