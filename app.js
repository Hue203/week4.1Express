const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(logger("dev"));
app.use(cors());
const { foos } = require("./foo.json");
///Create//

app.post("/foos", (req, res) => {
  foos.push({ ...req.body });
  res.send("Create item in foo");
});
///Get//

app.get("/foos", (req, res) => {
  // res.send("Hello Threee!");
  res.send(foos);
});
///Update//

app.patch("/foos/:id", (req, res) => {
  let idx = foos.findIndex((f) => {
    return f.id === parseInt(req.params.id);
  });
  const foo = foos[idx];

  foo[idx] = {
    ...foo,
    ...req.body,
  };

  res.send(foos);
});

///Delete//
app.delete("/foos/:id", (req, res) => {
  foos = foos.filter((f) => {
    return f.id !== parseInt(req.params.id);
  });
  res.send(foos);
});

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
