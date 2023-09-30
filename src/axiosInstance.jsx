import axios from "axios";

/**
 * Configuring the Backend URL
 *
 * By default, the URL is set to "http://localhost:8080/api/v1", which is suitable for
 * local development. However, you should update this URL to match your specific backend
 * server's address when deploying your application to different environments.
 *
 * Configuration Steps:
 *
 * 1. Locate the `backendUrl` variable in your code:
 *    ```
 *    const backendUrl =
 *      process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/v1";
 *    ```
 *
 * 2. Update the `backendUrl` variable as follows:
 *    - For local development, you can leave it as is (http://localhost:8080/api/v1).
 *    - For other environments, replace it with the appropriate
 *      backend server URL. For example:
 *      ```
 *      const backendUrl = "https://your-api-server.com/api/v1";
 *      ```
 *
 * 3. Save the changes to your code.
 *
 * By following these steps, you can configure the backend URL for your React application
 * based on your specific environment.
 *
 * Make sure to replace the URLs with the actual backend server URLs you want to use
 * in each environment.
 */
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
