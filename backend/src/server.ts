import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import BoardController from "./Controllers/Board/BoardController";
import ListController from "./Controllers/List/ListController";
import TaskController from "./Controllers/Task/TaskController";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 8000;

//BOARD ROUTES
app.get("/boards/:id", async (req, res) =>
  BoardController.GetSingleBoard(req, res)
);
app.get("/boards", async (req, res) => BoardController.GetAllBoards(req, res));
app.get("/boards/:id/lists-tasks", async (req, res) =>
  BoardController.GetBoardListsAndTasks(req, res)
);
app.post("/boards", async (req, res) => BoardController.AddBoard(req, res));

//LIST ROUTES
app.get("/lists", async (req, res) => ListController.GetAllLists(req, res));
app.get("/lists/:id", async (req, res) =>
  ListController.GetSingleList(req, res)
);
app.post("/lists", async (req, res) => ListController.AddList(req, res));
app.delete("/lists", async (req, res) => ListController.DeleteList(req, res));

//TASK ROUTES
app.get("/tasks", async (req, res) => TaskController.GetAllTasks(req, res));
app.get("/tasks/:id", async (req, res) =>
  TaskController.GetSingleTask(req, res)
);
app.get("/tasks/:id/related", async (req, res) =>
  TaskController.GetRelatedDetailsForTask(req, res)
);
app.put("/tasks", async (req, res) => TaskController.UpdateTask(req, res));
app.delete("/tasks", async (req, res) => TaskController.DeleteTask(req, res));

/*app.put("/subtasks", SubtaskController.updateOne); */

app.listen(SERVER_PORT, () =>
  console.log("Server listening on port " + SERVER_PORT)
);
