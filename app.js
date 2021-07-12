const express = require("express");
const logger = require("morgan");
require("dotenv").config();
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("HelloThreee!");
});
app.use(logger("dev"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.statusCode = 404;
  next(error);
});

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500);
  res.send(err.message);
}

app.use(errorHandler);
