import axios from "axios";

export const getAllAuthors = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Author");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch authors");
  }
};

export const createAuthor = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:44392/api/Author",
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to creating authors");
  }
};
export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(
      `https://localhost:44392/api/Author/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get authors");
  }
};

export const updateAuthorById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Author/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update authors");
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Author/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete authors");
  }
};
