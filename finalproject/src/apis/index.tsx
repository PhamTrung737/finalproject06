import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.interceptors.request.use((config: any) => {
  return config;
});

export default api;