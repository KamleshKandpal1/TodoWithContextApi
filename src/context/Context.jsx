import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const addTasks = (task) => {
    if (task.trim() === "") {
      alert("Enter valid input");
      return;
    }
    setTasks([...tasks, { id: v4(), task, complete: false }]);
  };

  const setStatusTask = (index, status) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, complete: status } : task
      )
    );
  };

  const setUpdateTask = (index, updatedTask) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, task: updatedTask } : task
      )
    );
  };
  const setDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTasks,
        setStatusTask,
        setUpdateTask,
        setDeleteTask,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
