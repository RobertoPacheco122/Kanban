import { IBoard } from "../../Models/Board";
import Database from "../DatabaseService/DatabaseService";

interface IBoardService {
  GetSingleBoard(id: number): Promise<IBoard | null>;
  GetAllBoards(): Promise<IBoard[] | null>;
  GetBoardListsAndTasks(id: number): Promise<IBoardListsAndTasks[]>;
  AddBoard(board: IBoard): Promise<IBoard | null>;
  UpdateBoard(id: number, board: IBoard): Promise<IBoard | null>;
  DeleteBoard(id: number): Promise<IBoard | null>;
}

interface ITask {
  id_task: number;
  task_title: string;
  task_description: string;
  task_priority: string;
}

interface IBoardListsAndTasks {
  id_list: number;
  list_name: string;
  tasks: ITask[];
}

class BoardService implements IBoardService {
  private readonly _Database: Database;

  constructor() {
    this._Database = new Database();
  }

  public async GetSingleBoard(id: number): Promise<IBoard | null> {
    const { rows } = await this._Database.Query<IBoard>(
      "SELECT id_board, name FROM boards WHERE is_deleted = false AND id_board = ($1)",
      [id]
    );
    if (!rows[0]) return null;

    return rows[0];
  }

  public async GetAllBoards(): Promise<IBoard[] | null> {
    const { rows } = await this._Database.Query<IBoard>(
      "SELECT id_board, name FROM boards WHERE is_deleted = false"
    );
    if (!rows) return null;

    return rows;
  }

  public async AddBoard(board: IBoard): Promise<IBoard | null> {
    const { rows } = await this._Database.Query<IBoard>(
      "INSERT INTO boards (name) VALUES ($1) RETURNING *",
      [board?.name]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async UpdateBoard(id: number, board: IBoard): Promise<IBoard | null> {
    const { rows } = await this._Database.Query<IBoard>(
      "UPDATE boards SET name = ($1), is_deleted = ($2) WHERE id_board = ($3) RETURNING *",
      [board?.name, board?.is_deleted, id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async DeleteBoard(id: number): Promise<IBoard | null> {
    const { rows } = await this._Database.Query<IBoard>(
      "UPDATE boards SET is_deleted = ($1) WHERE id_board = ($2) RETURNING *",
      [true, id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async GetBoardListsAndTasks(
    id: number
  ): Promise<IBoardListsAndTasks[]> {
    const listsIdsAssociatedWithBoard = await this._Database.Query(
      "SELECT id_list FROM lists WHERE lists.id_board = ($1)",
      [id]
    );

    const result: any[] = [];

    const fetchAllListsAndTasksFromBoard = async () => {
      for (const [_, listItem] of listsIdsAssociatedWithBoard.rows.entries()) {
        const { rows } = await this._Database.Query(
          `
          SELECT tasks.id_task, tasks.description, tasks.priority, tasks.title AS "task_title", lists.id_list, lists.name AS "list_name"
          FROM tasks
          INNER JOIN lists
          ON tasks.id_list = lists.id_list
          WHERE lists.id_list = ($1) AND lists.id_board = ($2)`,
          [listItem.id_list, id]
        );
        result.push(rows);
      }
    };

    await fetchAllListsAndTasksFromBoard();

    const response = result.reduce((result, currentList) => {
      if (currentList.length > 0) {
        const { id_list, list_name } = currentList[0];

        const tasks = currentList.map((task: any) => ({
          id_task: task.id_task,
          task_title: task.task_title,
          task_description: task.description,
          task_priority: task.priority,
        }));

        const listObject = {
          id_list,
          list_name,
          tasks,
        };

        result.push(listObject);
      }
      return result;
    }, []);

    return response;
  }
}

export default BoardService;
