import axios from "axios";

export const getAllPublishers = async () => {
  try {
    const response = await axios.get("https://localhost:44392/api/Publisher");
    return response.data;
  } catch (error) {
    console.log("Failed to fetch publishers");
  }
};

export const createPublisher = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:44392/api/Publisher",
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to create publisher");
  }
};

export const getPublisherById = async (id) => {
  try {
    const response = await axios.get(
      `https://localhost:44392/api/Publisher/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to get publisher by ID");
  }
};

export const updatePublisherById = async (id, data) => {
  try {
    const response = await axios.put(
      `https://localhost:44392/api/Publisher/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Failed to update publisher");
  }
};

export const deletePublisher = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44392/api/Publisher/${id}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to delete publisher");
  }
};
