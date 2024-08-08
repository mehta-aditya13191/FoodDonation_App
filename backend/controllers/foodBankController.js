const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const FoodBank = require("../models/foodBankSchema"); // Importing FoodBank model/schema
const Donations = require("../models/foodDonationSchema"); // Importing Donations model/schema
const Requests = require("../models/foodRequestSchema"); // Importing Requests model/schema

// Controller to filter and retrieve banks based on handle type
const filterController = async (req, res) => {
  try {
    const filter =
      req.params.handle == "bank"
        ? {}
        : { password: 0, requests: 0, donations: 0, stock: 0, __v: 0 };
    const banks = await FoodBank.find(req.body, filter);
    res.json(banks);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Retrieve all banks based on state and district
const getAllBanks = async (req, res) => {
  try {
    const banks = await FoodBank.find(
      { state: req.params.state, district: req.params.district },
      { password: 0, _id: 0, donations: 0, requests: 0, stock: 0 }
    );
    res.json(banks);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Update stock of a food group for a specific bank
const updateStock = async (req, res) => {
  try {
    const prevStock = await FoodBank.findOne({ _id: req.user }, { stock: 1 });
    await FoodBank.updateOne(
      { _id: req.user },
      {
        $set: {
          ["stock." + req.body.foodGroup]:
            prevStock.stock[req.body.foodGroup] + req.body.units,
        },
      }
    );
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Delete stock of a food group from a specific bank
const deleteStock = async (req, res) => {
  try {
    const prevStock = await FoodBank.findOne({ _id: req.user }, { stock: 1 });
    if (prevStock.stock[req.body.foodGroup] < req.body.units) {
      res.status(404).send("Not enough food");
    } else {
      await FoodBank.updateOne(
        { _id: req.user },
        {
          $set: {
            ["stock." + req.body.foodGroup]:
              prevStock.stock[req.body.foodGroup] - req.body.units,
          },
        }
      );
      res.status(200).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Get stock of a specific bank
const getStock = async (req, res) => {
  try {
    const data = await FoodBank.findOne(
      { _id: req.user },
      { _id: 0, stock: 1 }
    );
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Update status of a specific donation
const updateDonationStatus = async (req, res) => {
  try {
    await Donations.updateOne(
      { _id: req.body.id },
      { status: req.body.status }
    );
    res.status(200).send("Status updated");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Update status of a specific request
const updateRequestStatus = async (req, res) => {
  try {
    await Requests.updateOne({ _id: req.body.id }, { status: req.body.status });
    res.status(200).send("Status updated");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Get donation status for a specific bank
const getDonationStatus = async (req, res) => {
  try {
    const data = await Donations.find({ bankId: req.user }).populate(
      "userId",
      "-__v -password -requests -donations -stock"
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Get request status for a specific bank
const getRequestStatus = async (req, res) => {
  try {
    const data = await Requests.find({ bankId: req.user }).populate(
      "userId",
      "-__v -password -requests -donations -stock"
    );
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

// Update details of the current food bank
const updateFoodBank = async (req, res) => {
  try {
    console.log(req.user);
    await FoodBank.updateOne({ _id: req.user }, req.body);
    res.status(200).send("FoodBank updated");
  } catch (err) {
    console.error(err);
    res.status(500).send();
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
