import axios from "axios";

export const getBookAuthor = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/BookAuthor");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch BookAuthor");
  }
};

export const createBookAuthor = async (data) => {
  try {
    const response = await axios.post(
      `https://localhost:44392/api/BookAuthor`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to create BookAuthor:",
      error.response || error.message
    );
    throw error;
  }
};
