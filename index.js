const express = require("express");
//const imageRouter = require("./image/router");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use(imageRouter);
app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on :${port}`));
