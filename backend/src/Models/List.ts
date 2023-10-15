import { ITask } from "./Task";

export interface IList {
  id_list: number;
  id_board: number;
  name: string;
  tasks?: ITask[];
  is_deleted: boolean;
}
