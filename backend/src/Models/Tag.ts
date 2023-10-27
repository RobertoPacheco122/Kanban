import { ITask } from "./Task";

export interface ITag {
  id_tag: number;
  name: string;
  color_hexa: string;

  tasks?: ITask[];
}
