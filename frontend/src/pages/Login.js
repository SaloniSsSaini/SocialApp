import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <button onClick={handleLogin}>Login</button>

      {/* 👇 ADD */}
      <p onClick={() => window.location.href = "/signup"} style={{cursor: "pointer"}}>
        Don't have an account? Signup
      </p>
    </div>
  );
}