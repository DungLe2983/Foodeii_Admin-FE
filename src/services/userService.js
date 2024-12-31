// src/services/userService.js
import axios from "axios";

const API_URL = "http://localhost:8080/FoodStore_war_exploded/api/users";
const usingMockData = true;
const mockData = [
  {
    id: "676fdfb9738c3f0444015007",
    createdAt: "2024-12-31 12:27:15",
    updatedAt: "2024-12-31 12:27:15",
    name: "Nguyễn Văn Tuyết",
    email: "admin@gmail.com",
    passwordHash:
      "$2a$10$7mmjlNNCqe9vvXdM36sZNu4YfGBiL7Xi3Yh9HZSC0Va7kQqBXmamO",
    address: "216 Hàn Thuyên, Q3\n",
    phone: "0123456789",
    role: "ADMIN",
  },
];

// Lấy danh sách người dùng
export const getUsers = async () => {
  if (usingMockData) return mockData;
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/users",
    );
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Cập nhật người dùng
export const updateUser = async (id, userData) => {
  if (usingMockData) {
    const index = mockData.findIndex((user) => user.id === id);
    mockData[index] = { ...mockData[index], ...userData };
    return mockData[index];
  }
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/users/profile/${id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (id) => {
  if (usingMockData) return true;
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
