const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const router = new Router();
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

router.post("/login", (request, response, next) => {
  try {
    const { body } = request;
    if (!body.email || !body.password) {
      response.status(400).send({
        message: "Please supply a valid email and password"
      });
    } else {
      User.findOne({
        where: { email: body.email }
      })
        .then(entity => {
          if (!entity) {
            response.status(400).send({
              message: "User with that email does not exist"
            });
          } else if (bcrypt.compareSync(body.password, entity.password)) {
            response.send({
              jwt: toJWT({ userId: entity.id })
            });
          } else {
            response.status(400).send({
              message: "Password was incorrect"
            });
          }
        })
        .catch(err => {
          console.error(err);
          response.status(500).send({
            message: "Something went wrong"
          });
        });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
