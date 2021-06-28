const Users = require("../models/users");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAll() {
  return Users.find();
}

function findById(id) {
  return Users.findById(id);
}

async function signUp({ name, lastName, email, password, premium, roles }) {
  const userFound = await Users.findOne({ email });

  if (userFound) {
    throw new Error("Email already registered");
  }

  const encriptedPassword = await bcrypt.hash(password);

  return Users.create({
    name,
    lastName,
    email,
    password: encriptedPassword,
    premium,
    roles,
  });
}

async function signIn(email, password) {
  const userFound = await Users.findOne({ email });

  if (!userFound) {
    throw new Error("Invalid data");
  }

  const validPassword = await bcrypt.compare(password, userFound.password);

  if (!validPassword) {
    throw new Error("Invalid data");
  }

  return jwt.sign({ id: userFound._id });
}

function updateById(id) {
  return Users.findByIdAndUpdate(id);
}

function deleteById (id) {
  return Users.findByIdAndDelete(id)
}

module.exports = {
  getAll,
  findById,
  signUp,
  signIn,
  updateById,
  deleteById
};
