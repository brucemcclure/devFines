const FineModel = require("../database/models/fine_model");

async function create(req, res) {
    //logic for creating a resource
    let {name, user} = req.body;
    let fine = await FineModel.create({ name, user })
        .catch(err => res.status(500).send(err));

    res.redirect("/fines");
}

async function index(req, res) {
    //showed a list of all the resources
    let fines = await FineModel.find();
    res.render("fine/index", {fines});
}

function make(req, res) {
    //shows the form to create the resource
    res.render("fine/new");
}

async function show(req, res) {
    let { id } = req.params;
    let fine = await FineModel.findById(id).populate("user");
    console.log(fine);
    res.render("fine/show", { fine });
}

async function destroy(req, res) {
    let { id } = req.params;
    await FineModel.findByIdAndRemove(id);
    res.redirect("/fines");
}

async function update(req, res) {
    let { id } = req.params;
    let { name } = req.body;

    await FineModel.findByIdAndUpdate(id, {name});
    res.redirect(`/fines/${id}`);
}

async function edit(req, res) {
    let { id } = req.params;
    const fine = await FineModel.findById(id);
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
}