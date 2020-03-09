const express = require("express");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4001;
const stream = require("stream");
const db = require("./db");
const User = require("./model");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(authRouter);
app.use(userRouter);

app.get("/stream", (request, response) => {
  const action = {
    type: "ALL_USERS",
    payload: User
  };
  stream.updateInit(action);
  stream.init(request, response);
});

app.post("/user", (request, response) => {
  const { text } = request.body;
  User.create(text);
  response.send(text);
  const action = {
    type: "NEW_MESSAGE",
    payload: text
  };
  stream.send(action);
  console.log("db test", db);
});

app.listen(port, () => console.log(`Listening on :${port}`));
