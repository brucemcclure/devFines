// requires express
//requiring express, body parser express-handlebars,  
const express = require("express");
const exphbs = require('express-handlebars');
// declaring app & port
const app = express();
const port = 3004;
const mongoose = require("mongoose");

//Hooking up the mongoose DB
mongoose.connect("mongodb://localhost/fines", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

mongoose.connection.on("error", err => console.log(err));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//app.use(methodOverride('_method', { methods: ['POST', 'GET']}));



//These two lines of code make the stream of data useable
app.use(express.urlencoded());
app.use(express.json());

//Brings in the routes directory and picks up index automatically 
app.use(require("./routes"));


app.listen(port, () => console.log(`Server listening on port ${port}!`));
module.exports = app;