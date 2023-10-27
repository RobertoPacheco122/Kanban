import { IBoard } from "../../Models/Board";
import Database from "../../Services/DatabaseService/DatabaseService";
import { IBoardRepository } from "./IBoardRepository";

class BoardRepository implements IBoardRepository {
  private readonly _database: Database;

  constructor() {
    this._database = new Database();
  }

  public async AddBoard(name: string): Promise<IBoard | null> {
    const { rows } = await this._database.Query<IBoard>(
      "INSERT INTO boards (name) VALUES ($1) RETURNING name, is_deleted",
      [name]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async DeleteBoard(id: number): Promise<IBoard | null> {
    const { rows } = await this._database.Query<IBoard>(
      "UPDATE boards SET is_deleted = ($1) WHERE id_board = ($2) RETURNING *",
      [true, id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async GetAllBoards(): Promise<IBoard[] | null> {
    const { rows } = await this._database.Query<IBoard>(
      "SELECT * FROM boards WHERE is_deleted = false"
    );
    if (!rows) return null;

    return rows;
  }

  public async GetBoardListsAndTheirTasks(id: number): Promise<IBoard | null> {
    throw new Error("Method not implemented.");
  }

  public async GetSingleBoard(id: number): Promise<IBoard | null> {
    const { rows } = await this._database.Query<IBoard>(
      "SELECT id_board, name FROM boards WHERE is_deleted = false AND id_board = ($1)",
      [id]
    );
    if (!rows[0]) return null;

    return rows[0];
  }

  public async UpdateBoard(id: number, board: IBoard): Promise<IBoard | null> {
    const { rows } = await this._database.Query<IBoard>(
      "UPDATE boards SET name = ($1), is_deleted = ($2) WHERE id_board = ($3) RETURNING name, is_deleted",
      [board.name, board.is_deleted, id]
    );
    if (!rows) return null;

    return rows[0];
  }
}

export default BoardRepository;
