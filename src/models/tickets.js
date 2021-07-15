const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema({
  workerId: {
    type: String,
    minLength: 2,
    maxLenght: 100,
    required: true,
  },
  clientId: {
    type: String,
    minlength: 2,
    maxLenght: 100,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxLegth: 200,
    required: true,
  },
  address: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("tickets", ticketsSchema);

module.exports = model;
