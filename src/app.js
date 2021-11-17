const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("./routes/user");
const errorlogger = require("./utils/errorLogger");

const port = 2222;

app.use(express.json());
app.use(userRouter);
app.use(errorlogger);
app.listen(port, () => {
    console.log("server running");
})