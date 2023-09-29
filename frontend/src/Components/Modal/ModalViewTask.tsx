import React from "react";
import styles from "./Modal.module.css";

const ViewTask = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Design System</h1>
          <i className={`${styles.icon} ${styles.iconBigCross}`}></i>
        </div>
        <div>
          <TaskInformations />
          <Subtasks />
        </div>
      </div>
    </div>
  );
};

const TaskInformations = () => {
  return (
    <section className={styles.infosContainer}>
      <p className={styles.subtitle}>
        Create the logic to render de board with its list and task. And after
        that, the modal component
      </p>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconResponsable}`}></i>
          <span className={styles.infoName}>Responsable</span>
        </div>
        <div>
          <ul>
            <li className={styles.responsableContainer}>
              <i className={styles.responsableImage}></i>
              <span className={styles.responsableName}>Roberto Pacheco</span>
            </li>
          </ul>
        </div>
        <i className={`${styles.icon} ${styles.iconAddResponsable}`}></i>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconTags}`}></i>
          <span className={styles.infoName}>Tags</span>
        </div>
        <div>
          <ul>
            <li className={styles.tagContainer}>
              <span className={styles.tagName}>UI Designer</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconPriority}`}></i>
          <span className={styles.infoName}>Priority</span>
        </div>
        <div>
          <select name="list" id="list" className={styles.infoInput}>
            <option value="">Low Priority</option>
            <option value="">Mid Priority</option>
            <option value="">High Priority</option>
          </select>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconList}`}></i>
          <span className={styles.infoName}>List</span>
        </div>
        <div>
          <select name="list" id="list" className={styles.infoInput}>
            <option value="">Low Priority</option>
            <option value="">Mid Priority</option>
            <option value="">High Priority</option>
          </select>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconCalendar}`}></i>
          <span className={styles.infoName}>Date</span>
        </div>
        <div>
          <span>March 27 - 28, 2023</span>
        </div>
      </div>
    </section>
  );
};

const Subtasks = () => {
  return (
    <section className={styles.infosSubtask}>
      <div className={styles.infoIconContainer}>
        <i className={`${styles.icon} ${styles.iconSubtask}`}></i>
        <span className={styles.subtaskTitle}>Subtasks</span>
      </div>
      <ul>
        <li className={styles.subtaskContainer}>
          <input type="checkbox" name="task" id="task" />
          <span>Testando 1</span>
        </li>
        <li className={styles.subtaskContainer}>
          <input type="checkbox" name="task" id="task" />
          <span>Testando 1</span>
        </li>
        <li className={styles.subtaskContainer}>
          <input type="checkbox" name="task" id="task" />
          <span>Testando 1</span>
        </li>
      </ul>
    </section>
  );
};

export default ViewTask;
