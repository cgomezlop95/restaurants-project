const express = require("express");
const router = express.Router();
const restaurants = require("../data/restaurants.json");
const fs = require("fs").promises;

const cloudinary = require("../config/cloudinary");
const upload = require("../config/multer");

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

router.get("/", (req, res) => {
  res.json(restaurants);
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

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);

    const newId =
      restaurants.length > 0
        ? Math.max(
            ...restaurants.map((restaurant) => parseInt(restaurant.id))
          ) + 1
        : 1;

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    console.log("req.file", req.file);

    const restaurant_data = {
      name: req.body.name,
      id: newId,
      address: req.body.address,
      latlng: req.body.latlng,
      image: cldRes.secure_url || "url pending",
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

router.put("/update/review/:id", async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);
    const restaurant_id = parseInt(req.params.id, 10);

    const updated_restaurants = restaurants.map((restaurant) => {
      if (restaurant.id === restaurant_id) {
        return {
          ...restaurant,
          reviews: [...restaurant.reviews, req.body.review_data],
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

router.put("/update/details/:id", upload.single("image"), async (req, res) => {
  try {
    const data = await fs.readFile("./data/restaurants.json", "utf8");
    const restaurants = JSON.parse(data);
    const restaurant_id = parseInt(req.params.id, 10);
    console.log("req.body", req.body);
    console.log("req.file", req.file);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    const updated_restaurants = restaurants.map((restaurant) => {
      if (restaurant.id === restaurant_id) {
        console.log("entra en la modificación");
        return {
          ...restaurant,
          name: req.body.name,
          address: req.body.address,
          cuisine_type: req.body.cuisine_type,
          image: cldRes.secure_url || "url pending",
          latlng: req.body.latlng,
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

router.delete("/delete/:id", async (req, res) => {
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
