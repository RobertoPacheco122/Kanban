import React from "react";
import styles from "./Task.module.css";

interface Task {
  id_task: number;
  task_title: string;
}

const Task = ({ id_task, task_title }: Task) => {
  return (
    <li className={styles.taskCard}>
      <span className={styles.taskPriority}>Low Priority</span>
      <p className={styles.taskTitle}>{task_title}</p>
      <div className={styles.taskFooter}>
        <div className={styles.taskFooterSubtask}>
          <i className={`${styles.icon} ${styles.subtaskIcon}`}></i>
          <span>3</span>
        </div>
        <div className={styles.taskResponsablesContainer}>
          <i className={`${styles.icon} ${styles.taskAddResponsableIcon}`}></i>
          <i className={styles.taskResponsable}></i>
        </div>
      </div>
    </li>
  );
};

export default Task;
