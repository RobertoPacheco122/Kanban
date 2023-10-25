import React from "react";
import { ISubtask } from "../ModalViewTask";

import styles from "./Subtask.module.css";

interface SubtasksProps {
  subtasks: ISubtask[];
}

const Subtask = ({ subtasks }: SubtasksProps) => {
  const [subtasksItems, setSubtasksItems] = React.useState(subtasks);

  const handleSubtaskChange = (
    target: EventTarget & HTMLInputElement,
    id_subtask: number,
    index: number
  ) => {
    const newSubtasksItems = [...subtasksItems];
    newSubtasksItems[index].done = target.checked;

    setSubtasksItems(newSubtasksItems);
  };

  return (
    <section className={styles.infosSubtask}>
      <div className={styles.infoIconContainer}>
        <i className={styles.icon}></i>
        <span className={styles.subtaskTitle}>Subtasks</span>
      </div>
      <ul>
        {subtasksItems &&
          subtasksItems.map(({ id_subtask, description, done }, index) => (
            <li key={id_subtask} className={styles.subtaskContainer}>
              <input
                onChange={({ target }) =>
                  handleSubtaskChange(target, id_subtask, index)
                }
                type="checkbox"
                name="task"
                id="task"
                checked={done}
              />
              <span>{description}</span>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Subtask;
