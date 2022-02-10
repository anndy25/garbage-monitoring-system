const mongoose = require("mongoose");

const mongooseURL ="mongodb+srv://aniket2552001:12345@cluster0.tudxv.mongodb.net/gms-sysytem?retryWrites=true&w=majority";

const mongoDBConnection = () => {
  mongoose
    .connect(mongooseURL)
    .then(() => {
      console.log("connection sucessful with database!");
    })
    .catch((e) => {
      console.log("connection with database failed!");
    });
};

module.exports=mongoDBConnection;