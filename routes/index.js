// This file will direct the app to the correct route file.
const express = require("express");
const router = express.Router();
const userRoutes = require("./user_routes");
const fineRoutes = require("./fine_routes");
const authenticationRoutes = require("./authentication_routes");

router.use("/authentication", authenticationRoutes);
router.use("/users", userRoutes);
router.use("/fines", fineRoutes);

module.exports = router;
