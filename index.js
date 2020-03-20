const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 4001;
const app = express();

const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const eventRouter = require("./Event/router");
const ticketRouter = require("./Ticket/router");
const commentRouter = require("./Comment/router");
const db = require("./db");
const { User } = require("./user/model");

app.use(cors());
app.use(bodyParser.json());
app.use(authRouter);
app.use(userRouter);
app.use(eventRouter);
app.use(ticketRouter);
app.use(commentRouter);

app.listen(port, () => console.log(`Listening on :${port}`));
