const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fine_controller");
//const CommentController = require("./../controllers/comment_controller");

//index page of fines, to display all fines
router.get("/", fineController.index);

//Create a new fine off the index page
router.post("/", fineController.create);

// ???????????/
router.get("/new", fineController.make);

//Display a specific fine
router.get("/:id", fineController.show);

//Delete a specific fine
router.delete("/:id", fineController.destroy);

//Update a specific fine
router.put("/:id", fineController.update);

//Update a specific fine
router.patch("/:id", fineController.update);

//Edit a specific fine
router.get("/:id/edit", fineController.edit);

//router.post("/:fineId/comment", CommentController.create);

module.exports = router;
