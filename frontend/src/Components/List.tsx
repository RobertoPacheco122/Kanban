import React from "react";
import styles from "./List.module.css";
import Task from "./Task";

interface ITask {
  id_task: number;
  task_title: string;
}

interface List {
  id_list: number;
  list_name: string;
  tasks: ITask[];
}

const List = ({ id_list, list_name, tasks }: List) => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listName}>{list_name}</h2>
      <ul className={styles.tasksList}>
        {tasks &&
          tasks.map(({ id_task, task_title }) => (
            <Task key={id_task} id_task={id_task} task_title={task_title} />
          ))}
      </ul>
    </div>
  );
};

export default List;
