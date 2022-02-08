const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const groceriesRoute = require("./routes/groceries");
const marketsRoute = require("./routes/markets");
const authRoute = require("./routes/auth");
require("./database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "asasas",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});

app.use("/api", authRoute);

app.use((req, res, next) => {
  if (req.session.user) next();
  else {
    res.send(401);
  }
});
//먼저 로그인

app.use("/api", groceriesRoute);
app.use("/api", marketsRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
