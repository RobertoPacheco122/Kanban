import React from "react";
import useFetch from "../Hooks/useFetch";
import { BOARDS_LISTS_TASKS_GET } from "../../api";
import { IList } from "../Components/Board";

interface IBoardContext {
  data: IList[] | null;
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

  const { endpoint } = BOARDS_LISTS_TASKS_GET(actualBoardId);
  const { data } = useFetch<IList[]>(endpoint, [
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
