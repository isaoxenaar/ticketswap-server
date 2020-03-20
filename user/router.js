const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcryptjs");
const router = new Router();
const Event = require("../Event/model");

router.post("/user", (request, response, next) => {
  const password = bcrypt.hashSync(request.body.password, 10);

  const user = { ...request.body, password };

  User.create(user)
    .then(user => response.send(user))
    .catch(next);
});

router.get("/user", async (request, response, next) => {
  try {
    const users = await User.findAll(request.body, { include: [Event] });
    response.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
