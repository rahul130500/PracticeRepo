const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Sequelize = require("sequelize");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
const app = express();

const sequelize = require("./config/sequelize");
const diagnoseRoutes = require("./routes/diagnoseRoutes");
// Const Model
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Change this later to restrict it to react app only
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, x-auth-token, Origin, Accept"
  );
  next();
});
app.use("/diagnose", diagnoseRoutes);

sequelize
  .sync({
    force: true,
  })
  .then((result) => {
    console.log("Sync Done");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, (req, res) => {
  console.log(`Server is running on Port ${PORT}`);
});
