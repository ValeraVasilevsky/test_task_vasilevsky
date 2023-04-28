import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
