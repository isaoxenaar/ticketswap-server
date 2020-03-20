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
    const { body, user } = request;
    const ticket = await Ticket.create({
      logo: body.logo,
      description: body.description,
      price: body.price,
      userId: request.user.id
    });
    response.send(ticket);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/ticket/:id", // path with an id parameter
  async (request, response, next) => {
    // handler callback
    try {
      // deicde what parameters you want
      const { id } = request.params;

      // find the record you want to change with a promise
      const ticket = await Ticket.findByPk(id);

      console.log("request.body test:", request.body);
      //console.log('family test:', .dataValues)

      // update that one record with a promise
      const updated = await ticket.update(request.body);

      // send object as response
      response.send(updated);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
