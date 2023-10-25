import React from "react";

import styles from "./TaskField.module.css";

interface TaskFieldProps {
  fieldName: string;
  iconClassName: string;
  fieldContent: React.JSX.Element;
}

const TaskField = ({
  fieldName,
  iconClassName,
  fieldContent,
}: TaskFieldProps) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoIconContainer}>
        <i className={`${iconClassName} ${styles.icon}`}></i>
        <span>{fieldName}</span>
      </div>
      <div>{fieldContent}</div>
    </div>
  );
};

export default TaskField;
