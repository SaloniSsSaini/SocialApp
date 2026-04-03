import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
    req.headers["Content-Type"] = "multipart/form-data"; // 🔥 for image upload
  }

  return req;
});

export default API;