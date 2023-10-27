import { ITask } from "./Task";

export interface ISubtask {
  id_subtask: number;
  description: string;
  done: boolean;
  is_deleted: boolean;

  id_task: number;
  task: ITask;
}
