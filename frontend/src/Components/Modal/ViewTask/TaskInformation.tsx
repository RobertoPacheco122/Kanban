import React from "react";
import { Responsable, Tag, Priority } from "../ModalViewTask";
import { LIST_GET, TASKS_PUT } from "../../../../api";
import useFetch from "../../../Hooks/useFetch";

import styles from "./TaskInformation.module.css";
import icons from "../../../assets/css/icons.module.css";
import TaskField from "./TaskField";

interface TaskInformationsProps {
  description: string;
  responsables: Responsable[];
  tags: Tag[];
  priority: Priority;
  list_id: number;
  date: string | null;
  id_task: number;
}

interface List {
  id_list: number;
  name: string;
}

const TaskInformation = ({
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
      id: id_task,
      action: "updateDescription",
      param: taskDescription,
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
      id: id_task,
      action: "updatePriority",
      param: newPriorityValue,
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
      id: id_task,
      action: "updateList",
      param: +target.value,
    });

    const updateResponse = await fetch(endpoint, options);
    if (updateResponse.status != 204)
      console.log("Ocorreu um erro ao atualizar a List");
  };

  const handleDateChange = async (target: EventTarget & HTMLInputElement) => {
    const date = target.value;
    setDueDate(date);

    const { endpoint, options } = TASKS_PUT({
      id: id_task,
      action: "updateDueDate",
      param: date,
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
      <TaskField
        fieldName="Responsables"
        iconClassName={icons.iconResponsable}
        fieldContent={
          <ul className={styles.responsablesList}>
            {responsables &&
              responsables.map(({ id_user, username }) => (
                <li key={id_user} className={styles.responsableContainer}>
                  <i className={styles.responsableImage}></i>
                  <span className={styles.responsableName}>{username}</span>
                </li>
              ))}
          </ul>
        }
      />
      <TaskField
        fieldName="Tags"
        iconClassName={icons.iconTags}
        fieldContent={
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
        }
      />
      <TaskField
        fieldName="Priority"
        iconClassName={icons.iconPriority}
        fieldContent={
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
        }
      />
      <TaskField
        fieldName="List"
        iconClassName={icons.iconList}
        fieldContent={
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
        }
      />
      <TaskField
        fieldName="Testando"
        iconClassName={icons.iconCalendar}
        fieldContent={
          <input
            onChange={({ target }) => handleDateChange(target)}
            value={dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""}
            type="date"
            name="date"
            id="date"
            className={styles.infoInput}
          />
        }
      />
    </section>
  );
};

export default TaskInformation;
