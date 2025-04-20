import axios from "axios";

// Create an axios instance with a base URL and timeout
const callApiUrl = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

callApiUrl.interceptors.response.use(
  (config) => {
    const token = sessionStorage.getItem("USER_TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("USER_TOKEN");
      alert("Session expired. Please log in again.");
      window.location.href = "/authenticate";
    }
    return Promise.reject(error);
  }
);

callApiUrl.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("USER_TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default callApiUrl;
