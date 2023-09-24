import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import BoardController from "./Controllers/TBoardController.class.js";
import ListController from "./Controllers/TListController.class.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;

app.post("/boards", BoardController.createOne);
app.get("/boards", BoardController.getAll);
app.get(
  "/boards/:boardId/lists",
  BoardController.getBoardListsAndAllTheirTasks
);

app.post("/lists", ListController.createOne);
app.get("/lists", ListController.getAll);

app.listen(SERVER_PORT, () =>
  console.log("Server listening on port " + SERVER_PORT)
);
