const Users = require("../models/users");
const Tickets = require("../models/tickets")
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAll(filters) {
  return Users.find(filters);
}

function getById(id) {
  return Users.findById(id);
}

function getWorkers() {
  return Users.find({ roles: "worker" });
}

function getUser(token) {
  const { id } = jwt.decode(token);
  const user = getById(id);
  return user;
}

async function signUp({
  name,
  lastName,
  email,
  password,
  premium,
  roles,
  skills,
  price,
  gender,
  description,
  works,
  profilePicture,
  location,
}) {
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
    skills,
    price,
    premium,
    gender,
    description,
    works,
    profilePicture,
    location,
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

function updateById(id, dataToUpdate) {
  return Users.findByIdAndUpdate(id, dataToUpdate);
}

function deleteById(idUser) {
  return Users.findByIdAndDelete(idUser);
}
function updateScore(id, newScore) {
  return Users.findByIdAndUpdate(id, newScore);
}

module.exports = {
  getAll,
  getById,
  getWorkers,
  signUp,
  signIn,
  getUser,
  updateById,
  deleteById,
  updateScore,
};
