const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcryptjs");
const router = new Router();

router.post("/user", (request, response, next) => {
  console.log("New User");
  const password = bcrypt.hashSync(request.body.password, 10);

  const user = { ...request.body, password };

  User.create(user)
    .then(user => response.send(user))
    .catch(next);
});
router.get("/user", async (request, response, next) => {
  try {
    console.log("is this users", request);
    const users = await User.findAll(request.body, { include: [Image] });
    response.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
