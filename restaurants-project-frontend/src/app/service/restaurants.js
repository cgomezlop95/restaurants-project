import { api } from "./api";

const getRestaurants = async () => {
  const { data } = await api.get("/api/restaurant");
  return data;
};

const getRestaurantById = async (id) => {
  const { data } = await api.get(`/api/restaurant/${id}`);
  return data;
};

const postRestaurant = async ({ name, address, cuisine_type, image }) => {
  const { data } = await api.post(
    "/api/restaurant/create",
    {
      name,
      address,
      cuisine_type,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

export { getRestaurants, getRestaurantById, postRestaurant };
