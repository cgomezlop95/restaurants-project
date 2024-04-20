const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

const cookieSettings = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

router.get("/", (req, res) => {
  const users = require("../data/users.json");
  res.send(users);
});

router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", cookieSettings).send("Cookie is cleared");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/logged-in",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      console.log("Authenticated user:", req.user);
      res.json({ user: req.user });
    } catch (error) {
      console.error("Error when trying to fetch authenticated user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const userId = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.json(user);
  } catch (error) {
    console.error("Error accessing or processing the user data:", error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);

    const hashed_password = await bcrypt.hash(req.body.password, 10);
    const newId =
      users.length > 0
        ? Math.max(...users.map((user) => parseInt(user.id))) + 1
        : 1;

    const user_data = {
      email: req.body.email,
      username: req.body.username,
      favourite_restaurants: [],
      password: hashed_password,
      id: newId,
    };

    const updated_users = [...users, user_data];

    await fs.writeFile("./data/users.json", JSON.stringify(updated_users));

    const jwtToken = jwt.sign({ sub: user_data.email }, "secret");
    res.cookie("token", jwtToken, cookieSettings);
    res.status(201).json(user_data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await fs.readFile("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find((user) => user.email === req.body.email);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isPasswordValid) {
      const jwtToken = jwt.sign({ sub: user.email }, "secret", {
        expiresIn: "1h",
      });
      res.cookie("token", jwtToken, cookieSettings);
      res.status(200).send("Login successful and cookie set");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
