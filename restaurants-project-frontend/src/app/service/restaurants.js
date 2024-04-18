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
    const { data } = await api.put(`/api/restaurant/update/${id}`, {
      review_data,
    });
    console.log("Review added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export { getRestaurants, getRestaurantById, postRestaurant, addReview };
