import axios from "axios";

const API = axios.create({
  baseURL: "https://socialapp-3-ah53.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // 🔥 FIX
  }

  return req;
});

export default API;