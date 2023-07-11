import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseUrl } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [id, setId] = useState(null);

  //--- Get ALl Tasks ---//
  useEffect(() => {
    axios.get(`${baseUrl}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  //--- Save New Task ---//
  const addTask = () => {
    axios.post(`${baseUrl}/save`, { task: input }).then((res) => {
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  //--- Edit Task By Id ---//
  const updateMode = (id, task) => {
    setInput(task);
    setId(id);
  };

  //--- Update Task By Id ---//
  const updateTask = () => {
    axios.put(`${baseUrl}/update/${id}`, { task: input }).then((res) => {
      setUpdateUI((prevState) => !prevState);
      setId(null);
      setInput("");
    });
  };

  return (
    <main>
      <h1 className="title">CRUD OPERATION</h1>
      
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" onClick={id ? updateTask : addTask}>
          {id ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
