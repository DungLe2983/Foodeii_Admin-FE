import axios from "axios";

const API_URL = "http://localhost:8080/FoodStore_war_exploded/api/users";

// Lấy danh sách người dùng
export const getUsers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/users"
    );
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Cập nhật người dùng
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/users/profile/${id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/FoodStore_war_exploded/api/users/profile//${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
