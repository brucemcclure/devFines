const UserModel = require("./../database/models/user_model");

// registerNew is the GET request and renders the form to sign up to the app.
function registerNew(req, res) {
  // displays the registration form.
  res.render("authentication/register");
}
//  register create is the POST request, and on succesful creation of a new user will redirect them to the dashboard.

async function registerCreate(req, res, next) {
  //This is pulling the email and password off the post request. they are now named email and body
  const { email, password } = req.body;
  //user is then initilazed and the user model is called. The user is saved with their email&password.
  const user = await UserModel.create({ email, password });
  //login method takes a user and puts it on the session

  //req.login is used to establish a login session, which gives us access to req.session
  req.login(user, error => {
    if (error) {
      return next(error);
    }
    //Upon successful login, render the dashboard view and pass it the email. which was pulled off req.body
    return res.render("pages/dashboard", { email });
  });
}

//Logs the user out
function logout(req, res) {
  // logout is a passport predefined method
  req.logout();
  res.redirect("/");
}

//Logs the user in, shows the login form
function loginNew(req, res) {
  res.render("authentication/login");
}

//Logs in the user.
async function loginCreate(req, res) {
  //destructures req.body. pulls email and password off it.
  const { email, password } = req.body;
  //inits the user, searches the DB by the email.
  const user = await UserModel.findOne({ email });

  //If there is no user. render the login page again.
  if (!user) {
    return res.render("authentication/login", {
      error: "Invalid email & password"
    });
  }

  //inits "valid" ,  verifyPassword is inbuilt from passort
  const valid = await user.verifyPassword(password);

  //if not valid then render authentication/login
  if (!valid) {
    return res.render("authentication/login", {
      error: "Invalid email & password"
    });
  }

  req.session.user = user;
  res.redirect("/dashboard");
}

module.exports = {
  registerNew,
  registerCreate,
  logout,
  loginNew,
  loginCreate
};
