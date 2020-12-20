const {
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
} = process.env;

db.createUser({
  user: MONGO_INITDB_ROOT_USERNAME,
  pwd: MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: MONGO_INITDB_DATABASE,
    },
  ],
});
