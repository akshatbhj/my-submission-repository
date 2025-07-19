const express = require("express");
const mongoose = require("mongoose")
const bloglistRouter = require("./controllers/bloglist");
const { MONGODB_URI } = require("./utils/config");

const app = express();

console.log("connecting to database...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB 😘😘😘");
  })
  .catch((error) => {
    console.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());

app.use("/", bloglistRouter);

module.exports = app;
