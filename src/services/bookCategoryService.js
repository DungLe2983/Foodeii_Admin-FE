import axios from "axios";

export const getBookCategory = async () => {
  try {
    const response = await axios.get(
      "https://localhost:44392/api/BookCategory"
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch BookCategory");
  }
};

export const createBookCategory = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:44392/api/BookCategory",
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to creating BookCategory");
  }
};
