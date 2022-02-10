const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

JWT_SECRET = "one2ka4";
const authentication = require("../middlewares/authentication");
const UserInfo = require("../models/userInfoModel");

userRouter.post(
  "/signup",
  body("email", "Enter a valid name.").isEmail(),
  body("username", "Username field is empty.").exists(),
  body("password", "Password must be atleast 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await UserInfo.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("email is already is used");
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    try {
      user = await UserInfo.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        roomId: uuidv4(),
      });

      return res.status(201).send({ message: "Signup sucessful!" });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
);

userRouter.post(
  "/login",
  body("email", "Enter a valid name.").isEmail(),
  body("password", "Password filed is empty").exists(),
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await UserInfo.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .send({ error: "Please try to login with correct credentials" });
      } else {
        const authToken = jwt.sign(
          {
            username: user.username,
            email: user.email,
            roomId: user.roomId,
            userId: user._id,
          },
          JWT_SECRET
        );
        return res
          .status(200)
          .send({ authToken, message: "Login sucessful!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Internal server error" });
    }
  }
);

userRouter.get("/getuser/:id", authentication, async (req, res) => {
  if (req.params.id != req.user) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid token" });
  }
  try {
    const user = await UserInfo.findById(req.params.id);
    return res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = userRouter;
