import { IList } from "./List";
import { ISubtask } from "./Subtask";
import { ITag } from "./Tag";
import { IUser } from "./User";

export interface ITask {
  id_task: number;
  title: string;
  description: string;
  priority: string;
  done: boolean;
  created_at: Date;
  due_date: Date;
  is_deleted: boolean;

  id_list: number;
  list: IList;
  users?: IUser[];
  tags?: ITag[];
  subtasks?: ISubtask[];
}
