const express = require("express");
const router = express.Router();
const fineController = require("../controllers/fine_controller");
//const CommentController = require("./../controllers/comment_controller");

router.get("/", fineController.index);

router.post("/", fineController.create);

router.get("/new", fineController.make);

router.get("/:id", fineController.show);

router.delete("/:id", fineController.destroy);

router.put("/:id", fineController.update);

router.patch("/:id", fineController.update);

router.get("/:id/edit", fineController.edit);

//router.post("/:fineId/comment", CommentController.create);

module.exports = router;