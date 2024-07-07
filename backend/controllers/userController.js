const User = require("../models/userSchema"); // Importing User model/schema
const FoodBank = require("../models/foodBankSchema"); // Importing FoodBank model/schema
const Donations = require("../models/foodDonationSchema"); // Importing Donations model/schema
const Requests = require("../models/foodRequestSchema"); // Importing Requests model/schema

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user }); // Finding user by ID
    res.json(user); // Sending user data as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Donate food
const donate = async (req, res) => {
  try {
    req.body.userId = req.user; // Setting userId from request context
    const date = new Date(); // Getting current date and time
    req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString(); // Formatting date
    const newDonation = new Donations(req.body); // Creating new donation object
    const saved = await newDonation.save(); // Saving donation to database
    await FoodBank.updateOne(
      { _id: req.body.bankId }, // Finding FoodBank by ID
      { $push: { donations: { _id: saved._id } } } // Adding donation reference to FoodBank
    );
    res.send("done"); // Sending confirmation response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Make a food request
const request = async (req, res) => {
  try {
    req.body.userId = req.user; // Setting userId from request context
    const date = new Date(); // Getting current date and time
    req.body.date = date.toLocaleTimeString() + " " + date.toLocaleDateString(); // Formatting date
    const newRequest = new Requests(req.body); // Creating new request object
    const saved = await newRequest.save(); // Saving request to database
    await FoodBank.updateOne(
      { _id: req.body.bankId }, // Finding FoodBank by ID
      { $push: { requests: { _id: saved._id } } } // Adding request reference to FoodBank
    );
    res.send("done"); // Sending confirmation response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Get all donations made by the current user
const getDonations = async (req, res) => {
  try {
    const data = await Donations.find({ userId: req.user }).populate(
      "bankId", // Populating bankId field with FoodBank details excluding sensitive information
      "-_id -__v -password -requests -donations -stock"
    );
    res.json(data); // Sending donation data as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Get all requests made by the current user
const getRequests = async (req, res) => {
  try {
    const data = await Requests.find({ userId: req.user }).populate(
      "bankId", // Populating bankId field with FoodBank details excluding sensitive information
      "-_id -__v -password -requests -donations -stock"
    );
    res.json(data); // Sending request data as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Update details of the current user
const updateUser = async (req, res) => {
  try {
    User.updateOne({ _id: req.user }, req.body, (err, user) => {
      if (err) {
        res.status(404).send("User not found"); // Sending 404 status response if user not found
      } else {
        res.status(200).send("User updated"); // Sending 200 status response for successful update
      }
    });
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

module.exports = {
  getUserById,
  donate,
  request,
  getDonations,
  getRequests,
  updateUser,
};
