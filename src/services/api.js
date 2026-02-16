import axios from "axios";

const api = axios.create({
  baseURL: "https://script.google.com/macros/s/AKfycbzPWukp4dAGPZ52ak2h1GRL8ZdHG5UmYnKk60Dw7TnPE4g2q1bo7V3P-uv7UgdRpY2e/exec",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
