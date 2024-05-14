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
    <>
      <div className="w-full h-screen bg-[#a3989c] ">
        <h1 className="p-[10px] text-center text-[40px] font-bold text-[#40383b]">
          Todo List
        </h1>
        <div className="flex justify-center items-center flex-col ">
          <div className="w-4/6">
            <input
              type="text"
              name=""
              id=""
              placeholder="Add Task ....."
              className="w-[80%] p-1 rounded-tl-md rounded-bl-md focus:outline-none"
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
              className="bg-[#40383b] w-[20%] p-1 text-white rounded-tr-md rounded-br-md"
              onClick={() => {
                addTasks(taskInput);
                setTaskInput("");
              }}
            >
              Add
            </button>
          </div>
          <ul className="w-4/6 py-1.5">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="odd:bg-[#a3989c] even:bg-[#8b7cb1] odd:text-[#c1bdbc] even:text-[#a19698] px-1 py-[5px] my-1 rounded-md flex items-center "
              >
                {updateId !== index && (
                  <input
                    type="checkbox"
                    name=""
                    className="w-[4%]"
                    onChange={(e) => setStatusTask(index, e.target.checked)}
                    checked={task.complete}
                  />
                )}
                {updateId === index ? (
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Add Task ....."
                    className="w-[90%] p-1 rounded-md  focus:outline-none"
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
                    className={`px-4 text-[15px] w-[86%] ${
                      task.complete ? "line-through" : ""
                    }`}
                  >
                    {task.task}
                  </span>
                )}

                <div className="flex w-[10%] justify-around">
                  {updateId === index ? (
                    <button
                      className="bg-green-500 w-[20px] h-[20px] flex items-center justify-center text-white rounded-sm"
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
                      className="bg-blue-500 w-[20px] h-[20px] flex items-center justify-center text-white rounded-sm"
                      onClick={() => setEditTask(index, task.task)}
                      disabled={task.complete}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  )}
                  <button
                    className="bg-red-500 w-[20px] h-[20px] flex items-center justify-center text-white rounded-sm"
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
    </>
  );
}

export default App;
