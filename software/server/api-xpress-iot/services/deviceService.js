const DeviceInfo = require("../models/deviceModel");

const updateDeviceInfo = async (deviceId, data) => {
  let device = {
    ...data,
  };
  // console.log(deviceId,device);
 
  try {
    await DeviceInfo.findByIdAndUpdate({ _id: deviceId }, { $set: device });
  } catch (error) {
    console.error(error);
  }
  return;
};

module.exports = { updateDeviceInfo };
