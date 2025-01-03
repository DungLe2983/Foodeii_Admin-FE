import axios from "axios";

// Hàm lấy danh sách đơn hàng
export const getAllOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/orders"
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
  try {
    const response = await axios.delete(
      `http://localhost:8080/FoodStore_war_exploded/api/orders/${orderId}`
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
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/orders/${orderId}`,
      updatedData
    );
    return response.data; // Dữ liệu trả về sau khi cập nhật
  } catch (error) {
    // Xử lý lỗi khi gọi API
    console.error("Lỗi khi cập nhật đơn hàng", error);
    // throw new Error("Có lỗi xảy ra khi cập nhật đơn hàng");
    return null;
  }
};
