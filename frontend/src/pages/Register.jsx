import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({});

  const register = async () => {
    await axios.post("http://localhost:5000/api/auth/register", form);
    alert("Registered!");
    window.location = "/";
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={register}>Register</button>
    </div>
  );
}
