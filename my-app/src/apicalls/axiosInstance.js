import axios from "axios";

export const axiosInstance = axios.create();

// Add a request interceptor to set authorization header dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    // If token exists, set it as the authorization header
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
