import React from "react";
import Board from "./Components/Board";
import { BoardContextProvider } from "./Context/BoardContext";

import "./App.module.css";

const App = () => {
  return (
    <BoardContextProvider>
      <div>
        <Board />
      </div>
    </BoardContextProvider>
  );
};

export default App;
