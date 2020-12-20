require("dotenv/config");
const PORT = process.env.PORT || 3000;
const app = require("./app");
const connect = require("./database");

const start = async () => {
  await connect();

  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
  });
};

start();
