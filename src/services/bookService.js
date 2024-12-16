import axios from "axios";

export const getAllBooks = async () => {
  try {
    const response = await axios.get(
      "https://localhost:44392/api/Book?pageNumber=1&pageSize=50"
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch authors");
  }
};

export const createBook = async (data) => {
  try {
    const response = await axios.post("https://localhost:44392/api/Book", data);
    return response;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const getBooksByPage = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      `https://localhost:44392/api/Book?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get Books by page");
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`https://localhost:44392/api/Book/${id}`);
    return response.data;
  } catch (error) {
    console.log("Failed to get Book");
  }
};

export const updateBookById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Book/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update book:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Book/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete Book");
  }
};
