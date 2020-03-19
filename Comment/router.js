const express = require("express");
const Comment = require("./model");
const User = require("../user/model");
const router = express.Router();
const auth = require("../auth/middleware");

router.get("/comment", async (request, response, next) => {
  try {
    const comments = await Comment.findAll();
    response.send(comments);
  } catch (error) {
    next(error);
  }
});

router.post("/comment", auth, async (request, response, next) => {
  try {
    console.log("this is body", request.body);
    console.log("this is user", request.user);
    const { body, user } = request;
    const Comment = await Comment.create({
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
