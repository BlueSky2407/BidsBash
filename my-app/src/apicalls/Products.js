import { axiosInstance } from "./axiosInstance";

//adding products
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//fetch products
export const FetchProducts = async () => {
  try {
    const response = await axiosInstance.get("api/products/get-products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
