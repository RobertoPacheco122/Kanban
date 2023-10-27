import { IList } from "./List";

export interface IBoard {
  id_board: number;
  name: string;
  is_deleted: boolean;

  lists?: IList[];
}
