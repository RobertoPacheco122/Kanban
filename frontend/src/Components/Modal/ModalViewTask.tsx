import React from "react";
import useFetch from "../../Hooks/useFetch";
import { LIST_GET, TASKS_PUT, TASK_AND_THEIR_SUBTASKS_GET } from "../../../api";

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

interface Responsable {
  id_user: number;
  username: string;
}

interface Tag {
  id_tag: number;
  name: string;
  color_hexa: string;
}

interface ISubtask {
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
      taskId: id_task,
      newTitle: taskTitle,
      action: "updateTitle",
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
              <TaskInformations
                description={data.description}
                priority={data.priority}
                responsables={data.responsables}
                tags={data.tags}
                list_id={list_id}
                date={data.due_date}
                id_task={id_task}
              />
              <Subtasks subtasks={data.subtasks} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface List {
  id_list: number;
  name: string;
}

interface TaskInformationsProps {
  description: string;
  responsables: Responsable[];
  tags: Tag[];
  priority: Priority;
  list_id: number;
  date: string | null;
  id_task: number;
}

const TaskInformations = ({
  description,
  responsables,
  tags,
  priority,
  list_id,
  date,
  id_task,
}: TaskInformationsProps) => {
  const [taskPriority, setTaskPriority] = React.useState<Priority>(priority);
  const [taskList, setTaskList] = React.useState(list_id);
  const [taskDescription, setTaskDescription] = React.useState(description);
  const [dueDate, setDueDate] = React.useState(date);

  const { endpoint } = LIST_GET();
  const { data } = useFetch<List[]>(endpoint, [endpoint]);

  const handleDescriptionChange = async (
    target: EventTarget & HTMLTextAreaElement
  ) => {
    setTaskDescription(target.value);
  };

  const handleDescriptionBlur = async () => {
    const { endpoint, options } = TASKS_PUT({
      taskId: id_task,
      newDescription: taskDescription,
      action: "updateDescription",
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a Description");
  };

  const handlePriorityChange = async (
    target: EventTarget & HTMLSelectElement,
    id_task: number
  ) => {
    const newPriorityValue = target.value;
    setTaskPriority(newPriorityValue as Priority);
    const { endpoint, options } = TASKS_PUT({
      taskId: id_task,
      newPriorityValue,
      action: "updatePriority",
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a Task");
  };

  const handleListChange = async (
    target: EventTarget & HTMLSelectElement,
    id_task: number
  ) => {
    setTaskList(+target.value);

    const { endpoint, options } = TASKS_PUT({
      taskId: id_task,
      newListId: +target.value,
      action: "updateList",
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a List");
  };

  const handleDateChange = async (target: EventTarget & HTMLInputElement) => {
    const date = target.value;
    setDueDate(date);

    const { endpoint, options } = TASKS_PUT({
      taskId: id_task,
      newDueDate: date,
      action: "updateDueDate",
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a Due Date");
  };

  return (
    <section className={styles.infosContainer}>
      <textarea
        onChange={({ target }) => handleDescriptionChange(target)}
        onBlur={handleDescriptionBlur}
        value={taskDescription}
        className={styles.subtitle}
      ></textarea>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconResponsable}`}></i>
          <span className={styles.infoName}>Responsables</span>
        </div>
        <div>
          <ul className={styles.responsablesList}>
            {responsables &&
              responsables.map(({ id_user, username }) => (
                <li key={id_user} className={styles.responsableContainer}>
                  <i className={styles.responsableImage}></i>
                  <span className={styles.responsableName}>{username}</span>
                </li>
              ))}
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
          <ul className={styles.tagsList}>
            {tags &&
              tags.map(({ id_tag, name, color_hexa }) => (
                <li key={id_tag} className={styles.tagContainer}>
                  <span
                    className={styles.tagName}
                    style={{ backgroundColor: color_hexa }}
                  >
                    {name}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconPriority}`}></i>
          <span className={styles.infoName}>Priority</span>
        </div>
        <div>
          <select
            onChange={({ target }) => handlePriorityChange(target, id_task)}
            value={taskPriority}
            name="priority"
            id="priority"
            className={styles.infoInput}
          >
            <option value="null" disabled selected>
              Select a option
            </option>
            <option value="Low Priority">Low Priority</option>
            <option value="Mid Priority">Mid Priority</option>
            <option value="High Priority">High Priority</option>
          </select>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconList}`}></i>
          <span className={styles.infoName}>List</span>
        </div>
        <div>
          <select
            onChange={({ target }) => handleListChange(target, id_task)}
            value={taskList}
            name="list"
            id="list"
            className={styles.infoInput}
          >
            {data &&
              data.map(({ id_list, name }) => (
                <option key={id_list} value={id_list}>
                  {name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoIconContainer}>
          <i className={`${styles.icon} ${styles.iconCalendar}`}></i>
          <span className={styles.infoName}>Due Date</span>
        </div>
        <div>
          <input
            onChange={({ target }) => handleDateChange(target)}
            value={dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""}
            type="date"
            name="date"
            id="date"
            className={styles.infoInput}
          />
        </div>
      </div>
    </section>
  );
};

interface SubtasksProps {
  subtasks: ISubtask[];
}

const Subtasks = ({ subtasks }: SubtasksProps) => {
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
        <i className={`${styles.icon} ${styles.iconSubtask}`}></i>
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

export default ModalViewTask;
