import pool from "../../database.js";

class TListController {
  async createOne(req, res) {
    try {
      const { listName, boardOptionId } = req.body;

      const listIsAlreadyRegistered = await pool
        .query("SELECT name FROM LISTS WHERE name = ($1) AND id_board = ($2)", [
          listName,
          boardOptionId,
        ])
        .then((result) => result.rowCount);
      if (listIsAlreadyRegistered) throw new Error("This list already exist");

      const insertionResult = await pool.query(
        "INSERT INTO lists (name, id_board) VALUES ($1, $2) RETURNING *",
        [listName, boardOptionId]
      );
      const response = insertionResult.rows[0];

      res.status(201).json(response);
    } catch (error) {
      return res.status(409).json({ errorMessage: error });
    }
  }

  async getAll(req, res) {
    try {
      const { rows } = await pool.query(
        "SELECT id_list, name FROM lists WHERE is_deleted = false"
      );
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }
}

const ListController = new TListController();

export default ListController;
