const express = require("express");
const router = express.Router();
const PageController = require("./../controllers/page_controller");
const AuthenticationController = require("./../controllers/authentication_controller");
// Celebrate and JOI are used for validation
const { celebrate, Joi } = require("celebrate");
const {
  authRedirect,
  authorise
} = require("./../middleware/authorisation_middleware");
const passport = require("passport");

router.get("/", PageController.index);

//Log out of the application
router.get("/logout", AuthenticationController.logout);

//Showing the form to create a new user.
router.get("/register", authRedirect, AuthenticationController.registerNew);

//Posting to create a new user  ***
router.post(
  "/register",
  //validating via celebrate and Joi
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  AuthenticationController.registerCreate
);

// Display the dashboard  ****** THis shouls brobably be in the pages routes.
router.get("/dashboard", authorise, PageController.dashboard);

// Display the login form
router.get("/login", authRedirect, AuthenticationController.loginNew);

// Posting to the login using local.
router.post(
  "/login",
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }),
  passport.authenticate("local", {
    successRedirect: "/pages/dashboard",
    failureRedirect: "/login"
  })
);

module.exports = router;
