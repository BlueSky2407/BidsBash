const express = require("express");
const app = express();
app.use(express.json()); // to take req body from fe to destrcuture

var cors = require("cors");
app.use(cors());

require("dotenv").config();
const port = process.env.PORT;
console.log(port);

const DbConfig = require("./config/DbConfig.js");

const userRoute = require("./routes/UserRoute.js");
app.use("/api/users", userRoute);

const ProductsRoute = require("./routes/ProductsRoute.js");
app.use("/api/products", ProductsRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({
    msg: "hello",
  });
});
