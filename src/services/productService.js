import axios from "axios";

export const fetchProducts = async (page, pageSize) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/FoodStore_war_exploded/api/products",
      {
        params: {
          page: page,
          pageSize: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/FoodStore_war_exploded/api/products",
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

export const editProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/FoodStore_war_exploded/api/products/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    throw new Error("Error editing product: " + error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/FoodStore_war_exploded/api/products/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};
