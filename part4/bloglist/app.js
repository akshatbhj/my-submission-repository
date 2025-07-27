const express = require("express");
const mongoose = require("mongoose");
const bloglistRouter = require("./controllers/bloglist");
const usersRouter = require("./controllers/user");
const { MONGODB_URI } = require("./utils/config");
const { Info, Error } = require("./utils/logger");

const app = express();

Info("connecting to database...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    Info("connected to MongoDB 😘😘😘");
  })
  .catch((error) => {
    Error("error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.use("/", bloglistRouter);
app.use("/", usersRouter);

module.exports = app;
