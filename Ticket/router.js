const express = require("express");
const Ticket = require("./model");
const Event = require("../Event/model");
const User = require("../user/model");
const router = express.Router();
const auth = require("../auth/middleware");

router.get("/ticket", async (request, response, next) => {
  try {
    const tickets = await Ticket.findAll();
    response.send(tickets);
  } catch (error) {
    next(error);
  }
});

router.post("/ticket", auth, async (request, response, next) => {
  try {
    const { body, user, event } = request;
    console.log("this is event in ticketpost", request);
    const ticket = await Ticket.create({
      logo: body.logo,
      description: body.description,
      price: body.price,
      userId: request.user.id,
      eventId: body.eventId
    });
    response.send(ticket);
  } catch (error) {
    next(error);
  }
});

router.put("/ticket/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    const ticket = await Ticket.findByPk(id);

    const updated = await ticket.update(request.body);

    response.send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
