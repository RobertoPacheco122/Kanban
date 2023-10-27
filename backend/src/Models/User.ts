import { ITask } from "./Task";

export interface IUser {
  id_user: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;

  tasks?: ITask;
}
