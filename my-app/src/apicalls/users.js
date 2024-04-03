import { axiosInstance } from "./axiosInstance";

//signup
export const SignupUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/signup", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//login
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//fetch user
export const FetchUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
