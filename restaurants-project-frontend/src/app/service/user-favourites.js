import { api } from "./api";

const addFavourite = async (userId, restaurantData) => {
  try {
    const response = await api.put(`/api/favorite/${userId}/mark`, {
      restaurantData,
    });
    return response.data;
  } catch (error) {
    console.error("Error in addFavourite function:", error);
    throw error;
  }
};

const deleteFavourite = async (userId, restaurantData) => {
  try {
    const response = await api.put(`/api/favorite/${userId}/unmark`, {
      restaurantData,
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteFavourite function:", error);
    throw error;
  }
};

const getFavouriteRestaurants = async (userId) => {
  try {
    const { data } = await api.get(`/api/favourite/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching favourite restaurants:", error);
    throw error;
  }
};

export { addFavourite, deleteFavourite, getFavouriteRestaurants };
