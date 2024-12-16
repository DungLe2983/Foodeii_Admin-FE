import axios from "axios";

export const getAllCategories = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Category");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch Category");
  }
};

export const createCategory = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:44392/api/Category",
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to creating Category");
  }
};
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(
      `https://localhost:44392/api/Category/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get Category");
  }
};

export const updateCategoryById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Category/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update Category");
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Category/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete Category");
  }
};
