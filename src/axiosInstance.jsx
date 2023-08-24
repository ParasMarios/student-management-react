import axios from "axios";

// Determine the backend URL based on the current environment
const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
