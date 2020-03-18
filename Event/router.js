const express = require("express");
const Event = require("./model");
const User = require("../user/model");
const router = express.Router();
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
    console.log("this is body", request.body);
    console.log("this is user", request.user);
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

// router.post("/image", auth, async (request, response, next) => {
//   console.log("request.user", request.user);
//   try {
//     const { url, title } = request.body;
//     const entity = { url, title, userId: request.user.id };
//     const image = await Image.create(entity);
//     response.send(image);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
