const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors"); // Import the colors package

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`DB Connected Successfully`.bgGreen.white); // Use a function here
    })
    .catch((err) => {
      console.log(`Error in Mongodb ${err}`.bgRed.white);
    });
};
