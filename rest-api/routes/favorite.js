const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

router.get("/:id/favourite", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id, 10);
    const user = users.find((user) => user.id === userId);

    res.json(user.favourite_restaurants);
  } catch (error) {
    console.error("Error updating user favourite restaurants:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id/mark", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id, 10);

    const updated_users = users.map((user) => {
      if (user.id === userId) {
        const favouriteRestaurants = user.favourite_restaurants || [];
        return {
          ...user,
          favourite_restaurants: [
            ...favouriteRestaurants,
            req.body.restaurantData,
          ],
        };
      }

      return user;
    });

    await fs.writeFile("./data/users.json", JSON.stringify(updated_users));
    res.status(200).json(updated_users);
  } catch (error) {
    console.error("Error updating user favourite restaurants:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id/unmark", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id, 10);

    const updated_users = users.map((user) => {
      if (user.id === userId) {
        const updatedFavouriteRestaurants = user.favourite_restaurants
          ? user.favourite_restaurants.filter(
              (restaurant) => restaurant.id !== req.body.restaurantData.id
            )
          : [];

        return {
          ...user,
          favourite_restaurants: updatedFavouriteRestaurants,
        };
      }
      return user;
    });

    await fs.writeFile("./data/users.json", JSON.stringify(updated_users));
    res.status(200).json(updated_users);
  } catch (error) {
    console.error("Error updating user favourite restaurants:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
