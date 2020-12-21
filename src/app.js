const express = require("express");
const app = express();
const authMiddleware = require("./middlewares/auth.middleware");
const authModule = require("./modules/auth/auth");

const createApp = () => {
  app.use("/api/auth", authModule);

  app.use(authMiddleware);

  app.get("/api/protected", (req, res) => {
    res.json({
      ...req.user,
    });
  });

  app.use((error, req, res, next) => {
    const status = error.status || 500;
    console.error(error);
    return res.status(status).json({ error: error.toString() });
  });

  return app;
};

module.exports = createApp;
