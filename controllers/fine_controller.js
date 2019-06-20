const FineModel = require("../database/models/fine_model");

//creating a new fine
async function create(req, res) {
  //destructuring name and user off the req.body
  let { name, user } = req.body;
  //This needs to be editied... *****************************************
  let fine = await FineModel.create({ name, user }).catch(err =>
    res.status(500).send(err)
  );
  //Redirect to /fines
  res.redirect("/fines");
}

//Showing all fines
async function index(req, res) {
  //Querying the DB for all fines
  let fines = await FineModel.find();
  res.render("fine/index", { fines });
}

//The Show for the make new fines form
function make(req, res) {
  //shows the form to create the resource
  res.render("fine/new");
}

//Show a specific  fine
async function show(req, res) {
  //Destructuring. Getting the ID from req.params
  let { id } = req.params;
  //Querying the DB for the specific Fine
  let fine = await FineModel.findById(id).populate("user");
  //Logging the fine
  console.log(fine);
  //rendering the fine show. && passing the fine to it.
  res.render("fine/show", { fine });
}

//Destroying the fine
async function destroy(req, res) {
  //Destructuring, pulling the id off req.params
  let { id } = req.params;
  //Querying the DB, finding one and removing by the id. In build from mongoose.
  await FineModel.findByIdAndRemove(id);
  res.redirect("/fines");
}

//Updating a fine
async function update(req, res) {
  //Destructuring params and body
  let { id } = req.params;
  let { name } = req.body;

  //find by id and update, passing in the new value
  await FineModel.findByIdAndUpdate(id, { name });
  res.redirect(`/fines/${id}`);
}

//The show for updating the fine
async function edit(req, res) {
  let { id } = req.params;
  const fine = await FineModel.findById(id);
  //Rendering fine/edit and passing
  res.render("fine/edit", { fine });
}

module.exports = {
  create,
  index,
  make,
  show,
  destroy,
  update,
  edit
};
