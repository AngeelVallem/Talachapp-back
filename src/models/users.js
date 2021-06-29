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
  premium: {
    type: Boolean,
    required: true,
  },
  roles: {
    type: String,
    enum: ["user", "worker", "admin"],
    minLength: 1,
    required: true,
  },
  gender: {
    type: String,
    minLength: 1,
    maxLenght: 1,
    required: false,
  },
  skills: {
    type: String,
    enum: ["Carpinteria,Electricista,Mecanico,Albañileria"],
    minLength: 1,
    required: false,
  },
  description: {
    type: String,
    minLength: 2,
    maxLenght: 150,
    required: false,
  },
  favoritesWorkers: [],

  subscriptionId: {
    type: String,
  },

  location : {
    type : [String],
    enum : ['CDMX, Cuernavaca'],
    minLength : 1,
    maxLegth : 1,
    required : true
  }
//   ,
//   avgstar: {
//     type: Number,
//     required: true,
//     enum: ["1", "2", "3", "4","5"],
// }

});

const model = mongoose.model("users", usersSchema);

module.exports = model;
