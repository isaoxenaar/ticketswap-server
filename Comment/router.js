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
    const { body } = request;
    console.log("this is ticket");
    const comment = await Comment.create({
      author: body.author,
      text: body.text,
      userId: request.user.id,
      ticketId: body.ticketId
    });
    response.send(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
