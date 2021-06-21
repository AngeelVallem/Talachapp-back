const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLenght: 100,
    required: true,
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLenght: 100,
    required: true,
  },
  email: {
    type: String,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    maxLegth: 200,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
  },
  gender: {
    type: String,
    minLength: 1,
    maxLenght: 1,
    required: true,
  },
  role: {
    type: [String],
    minLength: 1,
    required: true,
  },
  skills: {
    type: [String],
    minLength: 1,
    required: false,
  },
  description: {
    type: String,
    minLength: 2,
    maxLenght: 150,
    required: false,
  },
  avatar: {
    type: String,
    minLength: 2,
    required: false,
  },
});



const model = mongoose.model('users', usersSchema)

module.exports = model 
