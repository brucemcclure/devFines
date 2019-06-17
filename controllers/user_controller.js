const UserModel = require("./../database/models/user_model");

async function create(req, res) {
    //logic for creating a resource
    let {name, bio, gender} = req.body;
    let user = await UserModel.create({ name, bio, gender })
        .catch(err => res.status(500).send(err));

    res.redirect("/users");
}

async function index(req, res) {
    //showed a list of all the resources
    let users = await UserModel.find();
    res.render("user/index", {users});
}

function make(req, res) {
    //shows the form to create the resource
    res.render("user/new");
}

async function show(req, res) {
    let { id } = req.params;
    let user = await UserModel.findById(id);
    res.render("user/show", { user });
}

async function destroy(req, res) {
    let { id } = req.params;
    await UserModel.findByIdAndRemove(id);
    res.redirect("/users");
}

async function update(req, res) {
    let { id } = req.params;
    let { name, bio, gender } = req.body;

    await UserModel.findByIdAndUpdate(id, {name, bio, gender});
    res.redirect(`/users/${id}`);
}

async function edit(req, res) {
    let { id } = req.params;
    const user = await UserModel.findById(id);
    res.render("user/edit", { user });
}

module.exports = {
    create,
    index,
    make,
    show,
    destroy,
    update,
    edit
}