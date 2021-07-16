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
    minlength: 2,
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
  price: {
    type: Number,
    required: false,
  },
  premium: {
    type: Boolean,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["user", "worker", "admin"],
    required: true,
  },
  gender: {
    type: String,
    minLength: 1,
    maxLenght: 1,
    required: false,
  },
  skills: {
    type: [String],
    enum: ["Carpintería", "Electricista", "Mecánico", "Albañilería"],
    minLength: 1,
    required: false,
  },
  description: {
    type: String,
    minLength: 2,
    maxLenght: 150,
    required: false,
  },
  subscriptionId: {
    type: String,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  location: {
    type: [String],
    enum: [
      "Álvaro Obregón",
      "Azcapotzalco",
      "Benito Juárez",
      "Coyoacán",
      "Cuajimalpa de Morelos",
      "Cuauhtémoc",
      "Gustavo A. Madero",
      "Iztacalco",
      "Tlalpan",
      "Venustiano Carranza",
      "Xochimilco",
    ],
    minLength: 1,
    maxLegth: 1,
    required: false,
  },
  score : [],

  //   ,
  //   avgstar: {
  //     type: Number,
  //     required: true,
  //     enum: ["1", "2", "3", "4","5"],
  // }
});

const model = mongoose.model("users", usersSchema);

module.exports = model;
