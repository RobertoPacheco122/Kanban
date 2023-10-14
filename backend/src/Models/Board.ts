import { IList } from "./List";

export interface IBoard {
  id_board: number;
  name: string;
  lists?: IList[];
  is_deleted: boolean;
}
