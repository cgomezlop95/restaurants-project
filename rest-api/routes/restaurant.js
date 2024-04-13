const express = require("express");
const router = express.Router();
const restaurants = require("../data/restaurants.json");
const fs = require("fs").promises;

router.get("/", (req, res) => {
  res.send(restaurants);
});

router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);
    const restaurant_id = parseInt(req.params.id, 10);
    const restaurant = restaurants.find((el) => el.id === restaurant_id);

    if (!restaurant) {
      return res.status(404).send("Restaurant not found.");
    }

    res.json(restaurant);
  } catch (error) {
    console.error("Error accessing or processing the restaurant data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);

    const newId =
      restaurants.length > 0
        ? Math.max(
            ...restaurants.map((restaurant) => parseInt(restaurant.id))
          ) + 1
        : 1;

    const restaurant_data = {
      name: req.body.name,
      id: newId,
      address: req.body.address,
      image: req.body.image || "url pending",
      cuisine_type: req.body.cuisine_type,
      reviews: [],
    };

    const updated_restaurants = [...restaurants, restaurant_data];

    await fs.writeFile(
      "./data/restaurants.json",
      JSON.stringify(updated_restaurants)
    );
    res.status(201).json(restaurant_data);
  } catch (error) {
    console.error("Error creating new restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);
    const restaurant_id = parseInt(req.params.id, 10);

    const updated_restaurants = restaurants.map((restaurant) => {
      if (restaurant.id === restaurant_id) {
        return {
          ...restaurant,
          name: req.body.name || restaurant.name,
          address: req.body.address || restaurant.address,
          image: req.body.image || restaurant.image,
          cuisine_type: req.body.cuisine_type || restaurant.cuisine_type,
          reviews: restaurant.reviews,
        };
      }

      return restaurant;
    });

    await fs.writeFile(
      "./data/restaurants.json",
      JSON.stringify(updated_restaurants)
    );
    res.status(200).json(updated_restaurants);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);
    const restaurant_id = parseInt(req.params.id, 10);

    const updated_restaurants = restaurants.filter(
      (restaurant) => restaurant.id !== restaurant_id
    );

    await fs.writeFile(
      "./data/restaurants.json",
      JSON.stringify(updated_restaurants)
    );
    res.status(204).json(updated_restaurants);
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
