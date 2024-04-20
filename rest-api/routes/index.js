const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/restaurant", require("./restaurant"));
router.use("/favorite", require("./favorite"));

module.exports = router;
