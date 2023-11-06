import React from "react";
import List from "./List";
import { useBoardContext } from "../Context/BoardContext";

import styles from "./Board.module.css";

const Board = () => {
  const { data } = useBoardContext();

  return (
    <section className={styles.board}>
      <div className={styles.boardContainer}>
        {data && (
          <>
            <h1 className={styles.boardName}>{data.name}</h1>
            <div className={styles.list}>
              {data.lists?.map(({ id, name, taskItems, boardId }) => (
                <List
                  key={id}
                  listId={id}
                  name={name}
                  taskItems={taskItems}
                  boardId={boardId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Board;
