const { Router } = require("express");
const User = require("./model");
const bcryptjs = require("bcryptjs");

const router = new Router();

router.post("/user", (request, response, next) => {
  const password = bcryptjs.hashSync(request.body.password, 10);

  const user = { ...request.body, password };

  User.create(user)
    .then(user => response.send(user))
    .catch(next);
});

module.exports = router;
