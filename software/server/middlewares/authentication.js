
const jwt = require("jsonwebtoken");
JWT_SECRET = "one2ka4";
const authentication = (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid token" });
  }
  try {
    const {userId}=jwt.verify(token, JWT_SECRET);
    req.user=userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate user with valid token" });
  }
};

module.exports = authentication;
