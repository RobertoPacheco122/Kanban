import { ISubtask } from "./Subtasks";

export interface ITask {
  id_task: number;
  id_list: number;
  title: string;
  description: string;
  priority: string;
  done: boolean;
  subtasks?: ISubtask[];
  created_at: Date;
  due_date: Date;
  is_deleted: boolean;
}
