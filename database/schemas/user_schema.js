const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
  // gender: {
  //     type: String,
  //     enum: ['male', 'female', 'non binary'],
  //     default: 'non binary'
  // }
});

module.exports = UserSchema;
