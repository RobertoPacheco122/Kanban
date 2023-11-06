import React from "react";
import ModalViewTask from "./Modal/ModalViewTask";
import { Priority } from "./Modal/ModalViewTask";

import styles from "./Task.module.css";

interface TaskProps {
  id_task: number;
  task_title: string;
  task_description: string;
  list_id: number;
  task_priority: Priority;
}

const Task = ({
  id_task,
  task_title,
  list_id,
  task_description,
  task_priority,
}: TaskProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const taskPriorityStyles = {
    "Low Priority": () => ({
      color: "#704b07",
      backgroundColor: "#ffeeca",
    }),
    "Mid Priority": () => ({
      color: "#0d5939",
      backgroundColor: "#e4f2ee",
    }),
    "High Priority": () => ({
      color: "#a42534",
      backgroundColor: "#ffeae9",
    }),
  };

  const priorityStyle = taskPriorityStyles[task_priority]?.();

  return (
    <>
      {isModalOpen ? (
        <ModalViewTask
          id_task={id_task}
          list_id={list_id}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
      <li onClick={() => setIsModalOpen(true)} className={styles.taskCard}>
        <div className={`${styles.taskHeader} ${styles.container}`}>
          <span
            style={{
              color: priorityStyle?.color,
              backgroundColor: priorityStyle?.backgroundColor,
            }}
            className={styles.taskPriority}
          >
            {task_priority?.split(" ")[0]}
          </span>
          <i className={styles.iconOptions}></i>
        </div>
        <div className={`${styles.taskContent} ${styles.container}`}>
          <p className={styles.taskTitle}>{task_title}</p>
          <p className={styles.taskDescription}>{task_description}</p>
        </div>
        <div className={`${styles.taskFooter} ${styles.container}`}>
          <div className={styles.taskFooterSubtask}>
            <i className={`${styles.icon} ${styles.subtaskIcon}`}></i>
            <span>3</span>
          </div>
          <div className={styles.taskResponsablesContainer}>
            <i className={styles.taskResponsable}></i>
          </div>
        </div>
      </li>
    </>
  );
};

export default Task;
