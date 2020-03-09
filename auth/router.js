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
router.get("/secret-endpoint", (req, res) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: "Thanks for visiting the secret endpoint.",
        data
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});
router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`
  });
});
module.exports = router;
