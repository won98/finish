const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/login_pt")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
