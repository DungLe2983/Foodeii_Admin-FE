import axios from "axios";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/categories"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/FoodStore_war_exploded/api/categories",
      categoryData
    );
    return response.data; // Trả về dữ liệu trả về từ server
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/categories/${categoryId}`,
      categoryData
    );
    return response.data; // Trả về dữ liệu trả về từ server
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Xóa danh mục
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/FoodStore_war_exploded/api/categories/${categoryId}`
    );
    return response.data; // Trả về dữ liệu trả về từ server
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
