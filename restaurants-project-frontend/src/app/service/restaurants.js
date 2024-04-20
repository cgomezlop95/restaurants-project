import { api } from "./api";

const getRestaurants = async () => {
  const { data } = await api.get("/api/restaurant");
  return data;
};

const getRestaurantById = async (id) => {
  const { data } = await api.get(`/api/restaurant/${id}`);
  return data;
};

const postRestaurant = async ({
  name,
  address,
  cuisine_type,
  image,
  latlng,
}) => {
  const { data } = await api.post(
    "/api/restaurant/create",
    {
      name,
      address,
      cuisine_type,
      image,
      latlng,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

const addReview = async (id, review_data) => {
  try {
    const { data } = await api.put(`/api/restaurant/update/review/${id}`, {
      review_data,
    });
    return data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

const modifyRestaurant = async (
  id,
  { name, address, cuisine_type, image, latlng }
) => {
  try {
    const { data } = await api.put(
      `/api/restaurant/update/details/${id}`,
      {
        name,
        address,
        cuisine_type,
        image,
        latlng,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("API request failed, error modifying restaurant:", error);
    throw error;
  }
};

const deleteRestaurant = async (id) => {
  try {
    const response = await api.delete(`/api/restaurant/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};

export {
  getRestaurants,
  getRestaurantById,
  postRestaurant,
  deleteRestaurant,
  addReview,
  modifyRestaurant,
};
