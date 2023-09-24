import pool from "../../database.js";

class TSubtaskController {
  async updateOne(req, res) {
    try {
      const subtasks = req.body;
      subtasks.forEach(async ({ id_subtask, done }) => {
        const updateSql = await pool.query(
          "UPDATE subtasks SET done = ($1) WHERE id_subtask = ($2)",
          [done, id_subtask]
        );
      });

      res.status(204);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }
}

const SubtaskController = new TSubtaskController();

export default SubtaskController;
