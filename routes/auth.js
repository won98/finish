const { Router } = require("express");
const User = require("../database/schemas/User");
const { hashPassword } = require("../utils/hashing");
const { comparePassword } = require("../utils/hashing");
const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send(401);
  const userDB = await User.findOne({ email });
  if (!userDB) return res.send(401);
  const isValid = comparePassword(password, userDB.password);
  if (isValid) {
    console.log("success");
    req.session.user = userDB;
    return res.send(200);
  } else {
    console.log("false");
    return res.send(401);
  }
});

router.post("/auth/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "user already exists" });
  } else {
    const password = hashPassword(req.body.password);
    console.log(hashPassword);
    const newUser = await User.create({
      username,
      password,
      email,
    });
    newUser.save();
    res.send(201);
  }
});
module.exports = router;
