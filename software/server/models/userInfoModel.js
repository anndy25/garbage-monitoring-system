const mongoose = require("mongoose");

const { Schema } = mongoose;
const userInfoSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserInfo=mongoose.model("user", userInfoSchema);
module.exports = UserInfo;
