import axios from "axios";
import { getCSRFToken } from "../utils/getCSRFToken";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const csrfToken = await getCSRFToken();
      config.headers["CSRF-Token"] = csrfToken;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
