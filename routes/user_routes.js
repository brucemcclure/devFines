const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

//Display all users
router.get("/", UserController.index);

//Create a new user *** THIS IS NOT BEING USED
router.post("/", UserController.create);

//Show the form for new user *** THIS IS NOT BEING USED
router.get("/new", UserController.make);

//Show an individual user
router.get("/:id", UserController.show);

//Delete an individual user
router.delete("/:id", UserController.destroy);

//Update an individual user
router.put("/:id", UserController.update);

//Update an individual user
router.patch("/:id", UserController.update);

//Displays the form to update the individual user.
router.get("/:id/edit", UserController.edit);

module.exports = router;
