import { IBoard } from "./Board";
import { ITask } from "./Task";

export interface IList {
  id_list: number;
  name: string;
  is_deleted: boolean;

  id_board: number;
  board: IBoard;
  tasks?: ITask[];
}
