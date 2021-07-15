const Tickets = require("../models/tickets");

function getAll(filters) {
  return Tickets.find(filters);
}


function changeStatus(id, status) {
  return Tickets.findByIdAndUpdate(id,status)
}

function create({ clientId, workerId, status, address, description }) {
  return Tickets.create({ clientId, workerId, status, address, description });
}

module.exports = {
  getAll,
  changeStatus,
  create,

};
