const mongoose = require("mongoose");

const { Schema } = mongoose;
const DeviceInfoSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-info'
},
  projectName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "offline",
  },
  socketID: {
    type: String,
    unique: true,
    default:null
  },
  data:Schema.Types.Object,
});

const DeviceInfo = mongoose.model("device", DeviceInfoSchema);
module.exports = DeviceInfo;
