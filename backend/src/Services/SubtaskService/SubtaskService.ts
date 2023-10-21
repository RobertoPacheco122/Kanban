import { ISubtask } from "../../Models/Subtask";
import Database from "../DatabaseService/DatabaseService";

type ISubtaskAction = "updateDescription" | "updateDone" | "updateTask";

interface ISubtaskService {
  GetSingleSubtask(id: number): Promise<ISubtask | null>;
  GetAllSubtasks(): Promise<ISubtask[] | null>;
  /* AddSubtask(subtask: ISubtask): Promise<ISubtask | null>; */
  UpdateSubtask(
    id: number,
    action: ISubtaskAction,
    param: string | number | boolean
  ): Promise<ISubtask | null>;
  DeleteSubtask(id: number): Promise<ISubtask | null>;
}

class SubtaskService implements ISubtaskService {
  private readonly _Database: Database;

  constructor() {
    this._Database = new Database();
  }

  public async GetSingleSubtask(id: number): Promise<ISubtask | null> {
    const { rows } = await this._Database.Query<ISubtask>(
      "SELECT * FROM subtasks WHERE id_subtask = ($1)",
      [id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async GetAllSubtasks(): Promise<ISubtask[] | null> {
    const { rows } = await this._Database.Query<ISubtask>(
      "SELECT * FROM subtasks"
    );
    if (!rows) return null;

    return rows;
  }

  public async UpdateSubtask(
    id: number,
    action: ISubtaskAction,
    param: string | number | boolean
  ): Promise<ISubtask | null> {
    const updateSubtaskActions = {
      updateDescription: async () =>
        await this._Database.Query<ISubtask>(
          "UPDATE subtasks SET description = ($1) WHERE id_subtask = ($2) RETURNING *",
          [param, id]
        ),
      updateDone: async () =>
        await this._Database.Query<ISubtask>(
          "UPDATE subtasks SET done = ($1) WHERE id_subtask = ($2) RETURNING *",
          [param, id]
        ),
      updateTask: async () =>
        await this._Database.Query<ISubtask>(
          "UPDATE subtasks SET id_task = ($1) WHERE id_subtask = ($2) RETURNING *",
          [param, id]
        ),
    };

    const { rows } = await updateSubtaskActions[action]?.();
    if (!rows) return null;

    return rows[0];
  }

  public async DeleteSubtask(id: number): Promise<ISubtask | null> {
    const { rows } = await this._Database.Query<ISubtask>(
      "UPDATE subtasks SET is_deleted = true WHERE id_subtask = ($1) RETURNING *",
      [id]
    );
    if (!rows) return null;

    return rows[0];
  }
}

export default SubtaskService;
