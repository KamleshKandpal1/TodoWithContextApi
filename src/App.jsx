import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "./context/Context";

function App() {
  const {
    setStatusTask,
    tasks,
    addTasks,
    setUpdateTask,
    setDeleteTask,
    setTasks,
  } = useTasks();
  const [taskInput, setTaskInput] = useState("");
  const [updateTaskInput, setUpdateTaskInput] = useState("");
  const [updateId, setUpdateId] = useState("");

  const setEditTask = (id, task) => {
    setUpdateId(id);
    setUpdateTaskInput(task);
  };

  useEffect(() => {
    const loadTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadTasks && loadTasks.length > 0) {
      setTasks(loadTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="w-full h-screen bg-[#a3989c] flex flex-col items-center justify-center">
      <h1 className="p-4 text-center text-3xl font-bold text-[#40383b] md:text-4xl">
        Todo List
      </h1>
      <div className="w-full max-w-md px-4">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add Task ....."
            className="flex-1 p-2 rounded-tl-md rounded-bl-md focus:outline-none"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTasks(taskInput);
                setTaskInput("");
              }
            }}
          />
          <button
            className="bg-[#40383b] p-2 text-white rounded-tr-md rounded-br-md"
            onClick={() => {
              addTasks(taskInput);
              setTaskInput("");
            }}
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-[#a3989c] odd:bg-[#a3989c] even:bg-[#8b7cb1] odd:text-[#c1bdbc] even:text-[#a19698] px-4 py-2 rounded-md flex items-center"
            >
              {updateId !== index && (
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) => setStatusTask(index, e.target.checked)}
                  checked={task.complete}
                />
              )}
              {updateId === index ? (
                <input
                  type="text"
                  placeholder="Update Task ....."
                  className="flex-1 p-2 rounded-md focus:outline-none"
                  value={updateTaskInput}
                  onChange={(e) => setUpdateTaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setUpdateTask(index, updateTaskInput);
                      setUpdateId("");
                      setUpdateTaskInput("");
                    }
                  }}
                />
              ) : (
                <span
                  className={`flex-1 ${task.complete ? "line-through" : ""}`}
                >
                  {task.task}
                </span>
              )}
              <div className="flex space-x-2">
                {updateId === index ? (
                  <button
                    className="bg-green-500 w-8 h-8 flex items-center justify-center text-white rounded-sm"
                    onClick={() => {
                      setUpdateTask(index, updateTaskInput);
                      setUpdateId("");
                      setUpdateTaskInput("");
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 w-8 h-8 flex items-center justify-center text-white rounded-sm"
                    onClick={() => setEditTask(index, task.task)}
                    disabled={task.complete}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                )}
                <button
                  className="bg-red-500 w-8 h-8 flex items-center justify-center text-white rounded-sm"
                  onClick={() => setDeleteTask(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
