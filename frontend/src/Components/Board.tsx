import React from "react";
import styles from "./Board.module.css";

const Board = () => {
  return (
    <section className={styles.board}>
      <div className={styles.boardContainer}>
        <h1 className={styles.boardName}>Studio Board</h1>

        <div className={styles.list}>
          <div className={styles.listContainer}>
            <h2 className={styles.listName}>Backlog</h2>
            <ul className={styles.tasksList}>
              <li className={styles.taskCard}>
                <span className={styles.taskPriority}>Low Priority</span>
                <p className={styles.taskTitle}>Company website redesign.</p>
                <div className={styles.taskFooter}>
                  <div className={styles.taskFooterSubtask}>
                    <i className={`${styles.icon} ${styles.subtaskIcon}`}></i>
                    <span>3</span>
                  </div>
                  <div className={styles.taskResponsablesContainer}>
                    <i
                      className={`${styles.icon} ${styles.taskAddResponsableIcon}`}
                    ></i>
                    <i className={styles.taskResponsable}></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.listContainer}>
            <h2 className={styles.listName}>Backlog</h2>
            <ul className={styles.tasksList}>
              <li className={styles.taskCard}>
                <span className={styles.taskPriority}>Low Priority</span>
                <p className={styles.taskTitle}>Company website redesign.</p>
                <div className={styles.taskFooter}>
                  <div className={styles.taskFooterSubtask}>
                    <i className={`${styles.icon} ${styles.subtaskIcon}`}></i>
                    <span>3</span>
                  </div>
                  <div className={styles.taskResponsablesContainer}>
                    <i
                      className={`${styles.icon} ${styles.taskAddResponsableIcon}`}
                    ></i>
                    <i className={styles.taskResponsable}></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
