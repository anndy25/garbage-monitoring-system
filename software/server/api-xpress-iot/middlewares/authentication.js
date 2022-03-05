
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid token" });
  }
  try {
    const {userId}=jwt.verify(token, process.env.JWT_SECRET);
    req.user=userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid token" });
  }
};

module.exports = authentication;
