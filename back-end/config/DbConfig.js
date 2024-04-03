const mongoose = require("mongoose");
const url = process.env.mongo_url;

//connection to db
mongoose.connect(url);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("db connection successful");
});

connection.on("error", () => {
  console.log("error");
});

module.exports = connection;
