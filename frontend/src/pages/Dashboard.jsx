import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", { title }, {
      headers: { Authorization: token }
    });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: token }
    });
    loadTasks();
  };

  useEffect(() => { loadTasks(); }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add</button>

      {tasks.map(t => (
        <div key={t._id}>
          {t.title}
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
