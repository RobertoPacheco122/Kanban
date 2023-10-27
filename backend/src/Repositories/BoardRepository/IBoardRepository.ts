import { IBoard } from "../../Models/Board";

export interface IBoardRepository {
  AddBoard(name: string): Promise<IBoard | null>;
  DeleteBoard(id: number): Promise<IBoard | null>;
  GetAllBoards(): Promise<IBoard[] | null>;
  GetBoardListsAndTheirTasks(id: number): Promise<IBoard | null>;
  GetSingleBoard(id: number): Promise<IBoard | null>;
  UpdateBoard(id: number, board: IBoard): Promise<IBoard | null>;
}
