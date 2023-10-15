import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import BoardController from "./Controllers/Board/BoardController";
import ListController from "./Controllers/List/ListController";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8000;

app.get("/boards/:id", async (req, res) =>
  BoardController.GetSingleBoard(req, res)
);
app.get("/boards", async (req, res) => BoardController.GetAllBoards(req, res));
app.get("/boards/:id/lists-tasks", async (req, res) =>
  BoardController.GetBoardListsAndTasks(req, res)
);
app.post("/boards", async (req, res) => BoardController.AddBoard(req, res));

app.get("/lists", async (req, res) => ListController.GetAllLists(req, res));
app.get("/lists/:id", async (req, res) =>
  ListController.GetSingleList(req, res)
);
app.post("/lists", async (req, res) => ListController.AddList(req, res));
app.delete("/lists", async (req, res) => ListController.DeleteList(req, res));

/*
app.get("/tasks/:taskId/subtasks", TaskController.getTaskAndAllTheirSubtasks);
app.post("/tasks", TaskController.createOne);
app.put("/tasks", TaskController.updateOne);

app.put("/subtasks", SubtaskController.updateOne); */

app.listen(SERVER_PORT, () =>
  console.log("Server listening on port " + SERVER_PORT)
);
