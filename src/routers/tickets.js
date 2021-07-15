const express = require("express");
const tickets = require("../usecases/tickets");

//Middlewares auth.js
const router = express.Router();

// ADMIN-USERS-WORKERS

router.get("/", async (request, response) => {

	const status = request.query.status
	const filters = {}

if(status) filters.status = status

  try {
    const ticket = await tickets.getAll(filters)
    response.json({
      success: true,
      message: "All tickets",
      tickets: ticket,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error not get tickets collection",
      error: error.message,
    });
  }
});

router.post("/generate", async (request, response) => {
  try {
    const ticket = await tickets.create(request.body);
    response.json({
      success: true,
      message: "ticket generated",
      ticket,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      message: "Error can not generate a ticket",
      error: error.message,
    });
  }
});

router.patch("/changeStatus/:id", async (request, response) => {
	try {

	const {id} = request.params;			
	  const ticket = await tickets.changeStatus(id, request.body)

		console.log(id);
		console.log(request.body);

	  response.json({
	    success: true,
	    message: "ticket updated",
	    ticket,
	  });
	} catch (error) {
	  response.status(400);
	  response.json({
	    success: false,
	    message: "Error can not generate a ticket",
	    error: error.message,
	  });
	}
      });

module.exports = router;
