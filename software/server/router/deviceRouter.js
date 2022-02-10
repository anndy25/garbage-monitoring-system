const express = require("express");
const deviceRouter = express.Router();
const DeviceInfo = require("../models/deviceModel");
const authentication = require("../middlewares/authentication");
const { body, validationResult } = require("express-validator");

deviceRouter.post(
  "/create",
  authentication,
  [
    body("projectName", "Enter a project name.").exists(),
    body("data", "Enter data filed").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      let device = new DeviceInfo({ ...req.body, user: req.user });
      device = await device.save();
      return res.status(201).send({ device });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ errors: "Internal Server Error" });
    }
  }
);
deviceRouter.put("/update/:id", authentication, async(req, res) => {
  try {
    let deviceInfo =await DeviceInfo.findById(req.params.id);
    if (!deviceInfo) {
      return res
        .status(401)
        .send({ error: "Not allowed to update device information" });
    }
    let device = {
      ...req.body
    };
    const newDeviceInfo =await DeviceInfo.findByIdAndUpdate(
      req.params.id,
      { $set: device},
      { new: true }
    );
    return res.status(202).send(newDeviceInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ errors: "Internal Server Error" });
  }
  //  let device=UserInfo.findById(req.user);
});

module.exports = deviceRouter;
