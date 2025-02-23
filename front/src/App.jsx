import { useState } from "react";
import axios from "axios";

const App = () => {
  const [task, setTask] = useState("");

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/add", {
        task,
      });
      console.log("Task added:", response.data);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default App;
