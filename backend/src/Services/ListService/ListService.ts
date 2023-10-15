import { IList } from "../../Models/List";
import Database from "../DatabaseService/DatabaseService";

interface IListService {
  GetSingleList(id: number): Promise<IList | null>;
  GetAllLists(): Promise<IList[] | null>;
  AddList(name: string, id_list: number): Promise<IList | null>;
  UpdateList(id: number, name: string, idBoard: number): Promise<IList | null>;
  DeleteList(id: number): Promise<IList | null>;
}

class ListService implements IListService {
  private readonly _Database: Database;

  constructor() {
    this._Database = new Database();
  }

  public async GetSingleList(id: number): Promise<IList | null> {
    const { rows } = await this._Database.Query<IList>(
      "SELECT * FROM lists WHERE id_list = ($1)",
      [id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async GetAllLists(): Promise<IList[] | null> {
    const { rows } = await this._Database.Query<IList>("SELECT * FROM lists");
    if (!rows) return null;

    return rows;
  }

  public async AddList(name: string, id_list: number): Promise<IList | null> {
    const { rows } = await this._Database.Query<IList>(
      "INSERT INTO lists (name, id_board) VALUES ($1, $2) RETURNING *",
      [name, id_list]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async UpdateList(
    id: number,
    name: string,
    idBoard: number
  ): Promise<IList | null> {
    const { rows } = await this._Database.Query<IList>(
      "UPDATE lists SET name = ($1), id_board = ($2) WHERE id_board = ($3) RETURNING *",
      [name, idBoard, id]
    );
    if (!rows) return null;

    return rows[0];
  }

  public async DeleteList(id: number): Promise<IList | null> {
    const { rows } = await this._Database.Query<IList>(
      "UPDATE lists SET is_deleted = ($1) WHERE id_list = ($2) RETURNING *",
      [true, id]
    );
    if (!rows) return null;

    return rows[0];
  }
}

export default ListService;
