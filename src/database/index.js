const mongoose = require("mongoose");

const {
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

const MONGO_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@database:27017/${MONGO_INITDB_DATABASE}`;

console.log(MONGO_URI);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      connectTimeoutMS: 1000,
    });

    console.log("db connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connect;
