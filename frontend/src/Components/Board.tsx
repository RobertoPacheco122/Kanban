import React from "react";
import useFetch from "../Hooks/useFetch";
import List from "./List";
import { BOARDS_LISTS_TASKS_GET } from "../../api";
import { Priority } from "./Modal/ModalViewTask";

import styles from "./Board.module.css";

interface IList {
  id_list: number;
  list_name: string;
  tasks: Task[];
}

interface Task {
  id_task: number;
  task_title: string;
  task_description: string;
  task_priority: Priority;
}

const Board = () => {
  const { endpoint } = BOARDS_LISTS_TASKS_GET(1);
  const { data } = useFetch<IList[]>(endpoint);

  return (
    <section className={styles.board}>
      <div className={styles.boardContainer}>
        <h1 className={styles.boardName}>Studio Board</h1>

        <div className={styles.list}>
          {data &&
            data.map(({ id_list, list_name, tasks }) => (
              <List
                key={id_list}
                id_list={id_list}
                list_name={list_name}
                tasks={tasks}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Board;
