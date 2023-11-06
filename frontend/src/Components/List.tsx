import React from "react";
import Task from "./Task";
import { ITask } from "../Context/BoardContext";
import styles from "./List.module.css";

interface ListProps {
  listId: number;
  name: string;
  taskItems: ITask[] | undefined;
  boardId: number;
}

const List = ({ listId, name, taskItems, boardId }: ListProps) => {
  const [listName, setListName] = React.useState(name);
  const [tasksList, setTasksList] = React.useState(taskItems);

  return (
    <div className={styles.listContainer}>
      <div className={styles.listNameContainer}>
        <input
          type="text"
          name="listName"
          value={listName}
          className={styles.listName}
        />
        <i className={`${styles.icon} ${styles.iconOptions}`}></i>
      </div>
      <ul className={styles.tasksList}>
        <li>
          <button className={styles.addTaskButton}>+ Add New Task</button>
        </li>
        {tasksList &&
          tasksList.map(({ id, title, description, priority }) => (
            <Task
              key={id}
              id_task={id}
              task_title={title}
              task_description={description}
              task_priority={priority}
              list_id={listId}
            />
          ))}
      </ul>
    </div>
  );
};

export default List;
