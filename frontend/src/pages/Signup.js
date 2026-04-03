import { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", data);
      alert("Signup successful");
      window.location.href = "/";
    } catch {
      alert("Error in signup");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Username"
        onChange={(e)=>setData({...data,username:e.target.value})} />

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}