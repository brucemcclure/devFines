const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const CommentSchema = require("./comment_schema");

const FineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    //comments: [CommentSchema]
});

module.exports = FineSchema;