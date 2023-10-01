import React from "react";
import Task from "./Task";
import { Priority } from "./Modal/ModalViewTask";

import styles from "./List.module.css";

interface ITask {
  id_task: number;
  task_title: string;
  task_description: string;
  task_priority: Priority;
}

interface ListProps {
  id_list: number;
  list_name: string;
  tasks: ITask[];
}

const List = ({ id_list, list_name, tasks }: ListProps) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.listNameContainer}>
        <h2 className={styles.listName}>{list_name}</h2>
        <i className={`${styles.icon} ${styles.iconOptions}`}></i>
      </div>
      <ul className={styles.tasksList}>
        <li>
          <button className={styles.addTaskButton}>+ Add New Task</button>
        </li>
        {tasks &&
          tasks.map(
            ({ id_task, task_title, task_description, task_priority }) => (
              <Task
                key={id_task}
                id_task={id_task}
                task_title={task_title}
                task_description={task_description}
                list_id={id_list}
                task_priority={task_priority}
              />
            )
          )}
      </ul>
    </div>
  );
};

export default List;
