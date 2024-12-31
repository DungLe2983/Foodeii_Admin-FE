import axios from "axios";

const usingMockData = true;
const mockData = [
  {
    id: "67725f0bfa95d821bb9596dd",
    createdAt: "2024-12-30 15:51:23",
    updatedAt: "2024-12-30 15:51:23",
    user: {
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
    totalAmount: 1500000,
    status: "PENDING",
    orderProducts: [
      {
        id: "67725f0bfa95d821bb9596de",
        createdAt: "2024-12-30 15:51:23",
        updatedAt: "2024-12-30 15:51:23",
        orderId: "67725f0bfa95d821bb9596dd",
        product: {
          id: "677036489e33130f4473bffc",
          createdAt: "2024-12-30 23:28:21",
          updatedAt: "2024-12-30 23:28:21",
          name: "Cà chua",
          description: "Cà chua sạch từ Nhật Bản",
          price: 500000,
          category: {
            id: "675ad29fc802a61fa175af46",
            createdAt: "2024-12-30 20:20:47",
            updatedAt: "2024-12-30 20:20:47",
            name: "Rau sạch",
            description: "All types of fresh fruits and berries",
          },
          stockQuantity: 5,
          imageUrl: "https://favri.org.vn/images/anh_tinkhoahoc/Ca_chua.jpg",
        },
        quantity: 3,
        price: 500000,
      },
    ],
  },
];

// Hàm lấy danh sách đơn hàng
export const getAllOrders = async () => {
  if (usingMockData) return mockData;
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/orders",
    );
    return response.data; // trả về dữ liệu từ API
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi tải danh sách đơn hàng", error);
    // throw new Error("Có lỗi xảy ra khi kết nối với máy chủ");
    return [];
  }
};

// Hàm xóa đơn hàng
export const deleteOrder = async (orderId) => {
  if (usingMockData) return true;
  try {
    const response = await axios.delete(
      `http://localhost:8080/FoodStore_war_exploded/api/orders/${orderId}`,
    );
    return response.status === 204; // true nếu xóa thành công
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi xóa đơn hàng", error);
    // throw new Error("Có lỗi xảy ra khi xóa đơn hàng");
    return false;
  }
};

// Hàm cập nhật đơn hàng (nếu cần)
export const updateOrder = async (orderId, updatedData) => {
  if (usingMockData) {
    const index = mockData.findIndex((order) => order.id === orderId);
    mockData[index] = { ...mockData[index], ...updatedData };
    return mockData[index];
  }
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/orders/${orderId}`,
      updatedData,
    );
    return response.data; // Dữ liệu trả về sau khi cập nhật
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi cập nhật đơn hàng", error);
    // throw new Error("Có lỗi xảy ra khi cập nhật đơn hàng");
    return null;
  }
};
