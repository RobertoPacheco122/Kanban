import React from "react";
import useFetch from "../../Hooks/useFetch";
import { TASKS_PUT, TASK_AND_THEIR_SUBTASKS_GET } from "../../../api";

import Subtask from "./ViewTask/Subtask";
import TaskInformation from "./ViewTask/TaskInformation";
import styles from "./Modal.module.css";

export type Priority = "Low Priority" | "Mid Priority" | "High Priority";

interface ITask {
  title: string;
  description: string;
  priority: Priority;
  due_date: string;
  responsables: Responsable[];
  tags: Tag[];
  subtasks: ISubtask[];
}

export interface Responsable {
  id_user: number;
  username: string;
}

export interface Tag {
  id_tag: number;
  name: string;
  color_hexa: string;
}

export interface ISubtask {
  id_subtask: number;
  description: string;
  done: boolean;
}

interface ModalViewTaskProps {
  id_task: number;
  list_id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalViewTask = ({
  id_task,
  list_id,
  setIsModalOpen,
}: ModalViewTaskProps) => {
  const { endpoint } = TASK_AND_THEIR_SUBTASKS_GET(id_task);
  const { data } = useFetch<ITask>(endpoint, [endpoint]);
  const [taskTitle, setTaskTitle] = React.useState(data?.title || "");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (target: EventTarget & HTMLInputElement) => {
    setTaskTitle(target.value);
  };

  const handleTitleBlur = async () => {
    const { endpoint, options } = TASKS_PUT({
      id: id_task,
      action: "updateTitle",
      param: taskTitle,
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar o title");
  };

  React.useEffect(() => setTaskTitle(data?.title || ""), [data]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {data && (
          <div>
            <div className={styles.header}>
              <input
                value={taskTitle}
                onChange={({ target }) => handleTitleChange(target)}
                onBlur={handleTitleBlur}
                type="text"
                className={styles.title}
              />
              <i
                onClick={() => closeModal()}
                className={`${styles.icon} ${styles.iconBigCross}`}
              ></i>
            </div>
            <div>
              <TaskInformation
                description={data.description}
                priority={data.priority}
                responsables={data.responsables}
                tags={data.tags}
                list_id={list_id}
                date={data.due_date}
                id_task={id_task}
              />
              <Subtask subtasks={data.subtasks} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalViewTask;
