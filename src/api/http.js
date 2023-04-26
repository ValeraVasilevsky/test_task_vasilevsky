import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: false,
});

http.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default http;
