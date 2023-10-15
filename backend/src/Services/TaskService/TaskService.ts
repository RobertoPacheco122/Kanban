import { ISubtask } from "../../Models/Subtasks";
import { ITag } from "../../Models/Tags";
import { ITask } from "../../Models/Task";
import { IUser } from "../../Models/User";
import Database from "../DatabaseService/DatabaseService";

type ITaskAction =
  | "updatePriority"
  | "updateList"
  | "updateTitle"
  | "updateDescription"
  | "updateDueDate";

interface RelatedDetailsTask
  extends Pick<
    ITask,
    "id_task" | "title" | "description" | "priority" | "due_date" | "subtasks"
  > {
  tags: ITag[];
  reponsables: IUser[];
}

interface ITaskService {
  GetSingleTask(id: number): Promise<ITask | null>;
  GetAllTasks(): Promise<ITask[] | null>;
  GetRelatedDetailsForTask(id: number): Promise<RelatedDetailsTask | null>;
  /* AddTask({ description, id_list, title }: ITaskSubset): Promise<ITask | null>; */
  UpdateTask(
    id: number,
    action: ITaskAction,
    param: string | number
  ): Promise<ITask | null>;
  DeleteTask(id: number): Promise<ITask | null>;
}

class TaskService implements ITaskService {
  private readonly _Database: Database;

  constructor() {
    this._Database = new Database();
  }

  public async GetSingleTask(id: number): Promise<ITask | null> {
    const { rows } = await this._Database.Query<ITask>(
      "SELECT * FROM tasks WHERE id_task = ($1)",
      [id]
    );
    if (!rows[0]) return null;

    return rows[0];
  }

  public async GetAllTasks(): Promise<ITask[] | null> {
    const { rows } = await this._Database.Query<ITask>("SELECT * FROM tasks");
    if (!rows[0]) return null;

    return rows;
  }

  public async GetRelatedDetailsForTask(
    id: number
  ): Promise<RelatedDetailsTask | null> {
    const task = await this._Database.Query<ITask>(
      "SELECT id_task, title, description, priority, due_date FROM tasks WHERE id_task = ($1)",
      [id]
    );
    const subtasks = await this._Database.Query<ISubtask>(
      "SELECT * FROM subtasks WHERE subtasks.id_task = ($1)",
      [id]
    );
    const tags = await this._Database.Query<ITag>(
      `
      SELECT tags.id_tag, tags.name, tags.color_hexa
        FROM tags 
        INNER JOIN tasks_tags 
        ON tags.id_tag = tasks_tags.id_tag 
        WHERE tasks_tags.id_task = ($1)`,
      [id]
    );
    const responsables = await this._Database.Query<IUser>(
      `
      SELECT users.id_user, users.username
        FROM users 
        INNER JOIN tasks_responsables
        ON users.id_user = tasks_responsables.id_user
        WHERE tasks_responsables.id_task = ($1)`,
      [id]
    );

    const response: RelatedDetailsTask = {
      id_task: task.rows[0].id_task,
      title: task.rows[0].title,
      description: task.rows[0].description,
      priority: task.rows[0].priority,
      due_date: task.rows[0].due_date,
      tags: tags.rows,
      reponsables: responsables.rows,
      subtasks: subtasks.rows,
    };

    return response;
  }

  public async UpdateTask(
    id: number,
    action: ITaskAction,
    param: string | number
  ): Promise<ITask | null> {
    const updateTaskActions = {
      updatePriority: async () =>
        await this._Database.Query<ITask>(
          `UPDATE tasks SET priority = ($1) WHERE id_task = ($2) RETURNING *`,
          [param, id]
        ),
      updateList: async () =>
        await this._Database.Query<ITask>(
          `UPDATE tasks SET id_list = ($1) WHERE id_task = ($2) RETURNING *`,
          [param, id]
        ),
      updateTitle: async () =>
        await this._Database.Query<ITask>(
          `UPDATE tasks SET title = ($1) WHERE id_task = ($2) RETURNING *`,
          [param, id]
        ),
      updateDescription: async () =>
        await this._Database.Query<ITask>(
          `UPDATE tasks SET description = ($1) WHERE id_task = ($2) RETURNING *`,
          [param, id]
        ),
      updateDueDate: async () =>
        await this._Database.Query<ITask>(
          `UPDATE tasks SET due_date = ($1) WHERE id_task = ($2) RETURNING *`,
          [param, id]
        ),
    };
    const { rows } = await updateTaskActions[action]?.();
    if (!rows) return null;

    return rows[0];
  }

  public async DeleteTask(id: number): Promise<ITask | null> {
    const { rows } = await this._Database.Query<ITask>(
      `UPDATE tasks SET is_deleted = ($1) WHERE id_task = ($2) RETURNING *`,
      [true, id]
    );
    if (!rows) return null;

    return rows[0];
  }
}

export default TaskService;
