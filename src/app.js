const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const authMiddleware = require("./middlewares/auth.middleware");

const authRouter = require("./routes/auth.router");

app.use(bodyParser.json());

app.use("/api", authRouter);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    ...req.user,
  });
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.error(error);
  return res.status(status).json({ error: error.toString() });
});

module.exports = app;
