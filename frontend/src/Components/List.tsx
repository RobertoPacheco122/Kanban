import React from "react";
import Task from "./Task";

import styles from "./List.module.css";
import { ITask } from "../Context/BoardContext";
import { LIST_PUT } from "../api/endpoints/list";

/* interface ITask {
  id_task: number;
  task_title: string;
  task_description: string;
  task_priority: Priority;
} */

interface ListProps {
  listId: number;
  name: string;
  taskItems: ITask[] | undefined;
  boardId: number;
}

const List = ({ listId, name, taskItems, boardId }: ListProps) => {
  const [listName, setListName] = React.useState(name);
  const [tasksList, setTasksList] = React.useState(taskItems);

  const handleListNameChange = (target: EventTarget & HTMLInputElement) => {
    setListName(target.value);
  };

  const handleListNameBlur = async () => {
    const { endpoint, options } = LIST_PUT({
      id: listId,
      name: listName,
      is_deleted: false,
      boardId: boardId,
    });

    const serverResponse = await fetch(endpoint, options);

    if (serverResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a List");
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.listNameContainer}>
        <input
          type="text"
          name="listName"
          value={listName}
          onChange={({ target }) => handleListNameChange(target)}
          onBlur={() => handleListNameBlur()}
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
