const express = require("express");
const router = express.Router();

const Event = require("./model");
const User = require("../user/model");
const auth = require("../auth/middleware");

router.get("/event", async (request, response, next) => {
  try {
    const events = await Event.findAll();
    response.send(events);
  } catch (error) {
    next(error);
  }
});

router.post("/event", auth, async (request, response, next) => {
  try {
    const { body, user } = request;
    const event = await Event.create({
      name: body.name,
      description: body.description,
      pictureurl: body.pictureurl,
      enddate: body.enddate,
      userId: request.user.id
    });
    response.send(event);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
