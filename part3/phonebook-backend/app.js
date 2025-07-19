const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require('./utils/middleware')
const phonebookRouter = require("./controllers/phonebookEntry");

const app = express();

logger.info("connecting to databse...");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB 😘😘😘");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/persons", phonebookRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
