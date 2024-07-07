const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const FoodBank = require("../models/foodBankSchema"); // Importing FoodBank model/schema
const Donations = require("../models/foodDonationSchema"); // Importing Donations model/schema
const Requests = require("../models/foodRequestSchema"); // Importing Requests model/schema

// Controller to filter and retrieve banks based on handle type
const filterController = async (req, res) => {
  try {
    const filter =
      req.params.handle == "bank" // Checking if the handle parameter is "bank"
        ? {} // If true, no additional filtering (empty object)
        : { password: 0, requests: 0, donations: 0, stock: 0, __v: 0 }; // If false, exclude sensitive fields from the response
    const banks = await FoodBank.find(req.body, filter); // Querying FoodBank collection with filter
    res.json(banks); // Sending filtered banks as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Retrieve all banks based on state and district
const getAllBanks = async (req, res) => {
  try {
    const banks = await FoodBank.find(
      { state: req.params.state, district: req.params.district }, // Querying banks based on state and district parameters from request
      { _id: 0, password: 0, donations: 0, requests: 0, stock: 0 } // Excluding sensitive fields from the response
    );
    res.json(banks); // Sending banks as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Update stock of a food group for a specific bank
const updateStock = async (req, res) => {
  try {
    const prevStock = await FoodBank.findOne({ _id: req.user }, { stock: 1 }); // Finding the current stock of the bank
    await FoodBank.updateOne(
      { _id: req.user }, // Updating the stock for the specific bank
      {
        $set: {
          // Setting the new stock value for the specified food group
          ["stock." + req.body.foodGroup]:
            prevStock.stock[req.body.foodGroup] + req.body.units, // Calculating new stock by adding units
        },
      }
    );
    res.status(200).send(); // Sending 200 status response for successful update
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Delete stock of a food group from a specific bank
const deleteStock = async (req, res) => {
  try {
    const prevStock = await FoodBank.findOne({ _id: req.user }, { stock: 1 }); // Finding the current stock of the bank
    if (prevStock.stock[req.body.foodGroup] < req.body.units) {
      // Checking if there's enough stock to delete
      res.status(404).send("Not enough food"); // Sending 404 status response if not enough food
    } else {
      await FoodBank.updateOne(
        { _id: req.user }, // Updating the stock for the specific bank
        {
          $set: {
            // Setting the new stock value for the specified food group
            ["stock." + req.body.foodGroup]:
              prevStock.stock[req.body.foodGroup] - req.body.units, // Calculating new stock by subtracting units
          },
        }
      );
      res.status(200).send(); // Sending 200 status response for successful update
    }
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Get stock of a specific bank
const getStock = async (req, res) => {
  try {
    const data = await FoodBank.findOne(
      { _id: req.user }, // Finding the bank by its ID
      { _id: 0, stock: 1 } // Including only the stock field in the response
    );
    res.status(200).send(data); // Sending 200 status response with stock data
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Update status of a specific donation
const updateDonationStatus = async (req, res) => {
  try {
    const result = await Donations.updateOne(
      { _id: req.body._id }, // Updating the donation by its ID
      { status: req.body.status } // Setting the new status for the donation
    );
    if (result.nModified > 0) {
      // Checking if any document was modified
      res.status(200).send("Status updated"); // Sending 200 status response for successful update
    } else {
      res.status(404).send("Donation not found"); // Sending 404 status response if donation not found
    }
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Update status of a specific request
const updateRequestStatus = async (req, res) => {
  try {
    const result = await Requests.updateOne(
      { _id: req.body.id }, // Updating the request by its ID
      { status: req.body.status } // Setting the new status for the request
    );
    if (result.nModified > 0) {
      // Checking if any document was modified
      res.status(200).send("Status updated"); // Sending 200 status response for successful update
    } else {
      res.status(404).send("Request not found"); // Sending 404 status response if request not found
    }
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Get donation status for a specific bank
const getDonationStatus = async (req, res) => {
  try {
    const data = await Donations.find({ bankId: req.user }).populate(
      "userId", // Populating the userId field with user details excluding sensitive information
      "-__v -password -requests -donations -stock"
    );
    res.json(data); // Sending donation status data as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Get request status for a specific bank
const getRequestStatus = async (req, res) => {
  try {
    const data = await Requests.find({ bankId: req.user }).populate(
      "userId", // Populating the userId field with user details excluding sensitive information
      "-__v -password -requests -donations -stock"
    );
    res.json(data); // Sending request status data as JSON response
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

// Update details of the current food bank
const updateFoodBank = async (req, res) => {
  try {
    const result = await FoodBank.updateOne({ _id: req.user }, req.body); // Updating the food bank details
    if (result.nModified > 0) {
      // Checking if any document was modified
      res.status(200).send("FoodBank updated"); // Sending 200 status response for successful update
    } else {
      res.status(404).send("FoodBank not found"); // Sending 404 status response if food bank not found
    }
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(500).send(); // Sending 500 status response for server error
  }
};

module.exports = {
  filterController,
  getAllBanks,
  updateStock,
  deleteStock,
  getStock,
  updateDonationStatus,
  updateRequestStatus,
  getDonationStatus,
  getRequestStatus,
  updateFoodBank,
};
