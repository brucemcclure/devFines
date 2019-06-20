function index(req, res) {
  req.session.views = req.session.views ? req.session.views + 1 : 1;
  res.json(req.session);
}

function dashboard(req, res) {
  const email = req.user.email;
  console.log(req.user);
  res.render("pages/dashboard", { email });
}

module.exports = {
  index,
  dashboard
};
