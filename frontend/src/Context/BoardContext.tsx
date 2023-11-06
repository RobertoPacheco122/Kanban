import React from "react";
import useFetch from "../Hooks/useFetch";
import { BOARD_RELATED_DETAILS_GET } from "../api/endpoints/Board";

interface IBoard {
  id: number;
  name: string;
  is_deleted: boolean;
  lists?: IList[];
}

export interface IList {
  id: number;
  name: string;
  is_deleted: boolean;
  boardId: number;
  taskItems?: ITask[];
}

type TaskPriority = "Low Priority" | "Mid Priority" | "High Priority";

export interface ITask {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  done: boolean;
  is_Deleted: boolean;
  created_At: string;
  due_Date: string;
  listId: number;
  users?: IUser[];
  tags?: ITag[];
  subtasks?: ISubtask[];
}

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  created_At: string;
  due_Date: string;
  is_Deleted: boolean;
}

interface ITag {
  id: number;
  name: string;
  color_Hexa: string;
}

interface ISubtask {
  id: number;
  description: string;
  done: boolean;
  is_Deleted: boolean;
  taskItemId: number;
}

interface IBoardContext {
  data: IBoard | null;
  actualBoardId: number;
  setActualBoardId: React.Dispatch<React.SetStateAction<number>>;
  setTriggerBoardFetch: React.Dispatch<React.SetStateAction<number>>;
}

const BoardContext = React.createContext<IBoardContext | null>(null);

export const useBoardContext = () => {
  const context = React.useContext(BoardContext);
  if (!context)
    throw new Error(
      "Ocorreu algum erro ao utilizar o BoardContext. Provavelmente algum componente não está englobado no Context.Provider de BoardContext"
    );

  return context;
};

export const BoardContextProvider = ({ children }: React.PropsWithChildren) => {
  const [actualBoardId, setActualBoardId] = React.useState(1);
  const [triggerBoardFetch, setTriggerBoardFetch] = React.useState(Date.now());

  const { endpoint } = BOARD_RELATED_DETAILS_GET(actualBoardId);
  const { data } = useFetch<IBoard>(endpoint, [
    actualBoardId,
    triggerBoardFetch,
  ]);

  return (
    <BoardContext.Provider
      value={{ data, actualBoardId, setActualBoardId, setTriggerBoardFetch }}
    >
      {children}
    </BoardContext.Provider>
  );
};
