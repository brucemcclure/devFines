const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/user_controller");

router.get("/", UserController.index);

router.post("/", UserController.create);

router.get("/new", UserController.make);

router.get("/:id", UserController.show);

router.delete("/:id", UserController.destroy);

router.put("/:id", UserController.update);

router.patch("/:id", UserController.update);

router.get("/:id/edit", UserController.edit);

module.exports = router;