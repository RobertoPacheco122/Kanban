import pool from "../../database.js";

class TTaskController {
  async createOne(req, res) {
    try {
      const { title, description, subtasks, listOptionId } = req.body;
      const taskInsertionResult = await pool.query(
        "INSERT INTO tasks (title, description, done, id_list) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, false, listOptionId]
      );

      const taskId = await taskInsertionResult.rows[0].id_task;

      if (subtasks) {
        subtasks.forEach(async (subtask) => {
          const subtaskInsertionResult = await pool.query(
            "INSERT INTO subtasks (description, done, id_task) VALUES ($1, $2, $3)",
            [subtask, false, taskId]
          );
        });
      }
      return res.status(201).json(taskInsertionResult);
    } catch (error) {
      return res.status(409).json({ errorMessage: error });
    }
  }

  async getOne(req, res) {
    try {
      const taskId = req.params.taskId;
      const { rows } = await pool.query(
        "SELECT * FROM tasks WHERE is_deleted = false AND id_task = ($1)",
        [taskId]
      );

      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }

  async updateOne(req, res) {
    try {
      const { taskId, newListId } = req.body;
      const updateSql = await pool.query(
        `
        UPDATE tasks SET id_list = ($1) WHERE id_task = ($2)
      `,
        [newListId, taskId]
      );

      return res.status(204);
    } catch (error) {
      return res.status(400).json({ errorMessage: error });
    }
  }

  async getTaskAndAllTheirSubtasks(req, res) {
    try {
      const taskId = req.params.taskId;
      const taskData = await pool.query(
        "SELECT title, description, priority, due_date FROM tasks WHERE tasks.id_task = ($1) and is_deleted = false",
        [taskId]
      );
      const subtasksData = await pool.query(
        "SELECT id_subtask, description, done FROM subtasks WHERE subtasks.id_task = ($1)",
        [taskId]
      );
      const tagsData = await pool.query(
        "SELECT tags.id_tag, tags.name, tags.color_hexa FROM tags INNER JOIN tasks_tags ON tags.id_tag = tasks_tags.id_tag WHERE tasks_tags.id_task = ($1)",
        [taskId]
      );

      const responsablesData = await pool.query(
        `
        SELECT users.id_user, users.username
        FROM users INNER JOIN tasks_responsables
        ON users.id_user = tasks_responsables.id_user
        WHERE tasks_responsables.id_task = ($1);
      `,
        [taskId]
      );

      let dueData = taskData.rows[0].due_date
        ? new Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC",
          }).format(new Date(taskData.rows[0].due_date))
        : null;

      const response = {
        title: taskData.rows[0].title,
        description: taskData.rows[0].description,
        priority: taskData.rows[0].priority,
        due_date: dueData,
        tags: tagsData.rows,
        responsables: responsablesData.rows,
        subtasks: subtasksData.rows,
      };

      res.status(200).json(response);
    } catch (error) {
      return res.status(409).json({ errorMessage: error });
    }
  }
}

const TaskController = new TTaskController();

export default TaskController;
