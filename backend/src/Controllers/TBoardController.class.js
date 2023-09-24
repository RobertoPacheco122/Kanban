import pool from "../../database.js";

class TBoardController {
  async createOne(req, res) {
    try {
      const { boardName } = req.body;

      const boardIsAlreadyRegistered = await pool
        .query("SELECT name FROM boards WHERE name = ($1)", [boardName])
        .then((result) => result.rowCount);
      if (boardIsAlreadyRegistered) throw new Error("This board already exist");

      const result = await pool.query(
        "INSERT INTO boards (name) VALUES ($1) RETURNING *",
        [boardName]
      );
      const newUser = result.rows[0];

      res.status(201).json(newUser);
    } catch (error) {
      return res.status(409).json({ errorMessage: error });
    }
  }

  async getOne(req, res) {
    try {
      const boardId = req.params.boardId;
      const { rows } = await pool.query(
        "SELECT id_board, name FROM boards WHERE is_deleted = false AND id_board = ($1)",
        [boardId]
      );

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }

  async getAll(req, res) {
    try {
      const { rows } = await pool.query(
        "SELECT id_board, name FROM boards WHERE is_deleted = false"
      );

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }

  async getBoardListsAndAllTheirTasks(req, res) {
    try {
      const boardId = req.params.boardId;
      const listsIds = await pool.query(
        "SELECT id_list FROM lists WHERE lists.id_board = ($1)",
        [boardId]
      );
      const response = [];

      const fetchAllListsAndTasksFromBoard = async (boardId) => {
        for (const listItem of listsIds.rows) {
          const { rows } = await pool.query(
            `
            SELECT tasks.id_task, tasks.title AS "task_title", lists.id_list, lists.name AS "list_name"
            FROM tasks
            INNER JOIN lists
            ON tasks.id_list = lists.id_list
            WHERE lists.id_list = ($1) AND lists.id_board = ($2)`,
            [listItem.id_list, boardId]
          );
          response.push(rows);
        }
      };

      await fetchAllListsAndTasksFromBoard(boardId);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }
}

const BoardController = new TBoardController();

export default BoardController;
