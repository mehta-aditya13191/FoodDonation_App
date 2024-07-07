// Import mongoose module
const mongoose = require("mongoose");

// Define an array of food groups for validation in the schema
const foodGroups = [
  "Non-Perishable Food",
  "Perishable Food",
  "Prepared Food",
  "Baby Food and Formula",
  "Snacks and Beverages",
];

// ------- Requests Model -------

// Create schema for Requests
const foodRequests = new mongoose.Schema({
  // Reference to the User who made the request, required field
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  // Reference to the Food Bank where the request is made, required field
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodBanks",
    required: true,
  },
  // Name of the person requesting food, required field
  name: { type: String, required: true },
  // Age of the person requesting food, required field
  age: { type: Number, required: true },
  // Gender of the person requesting food, required field
  gender: { type: String, required: true },
  // Food group requested, must be one of the defined foodGroups, required field
  foodGroup: { type: String, enum: foodGroups, required: true },
  // Number of units requested, required field
  units: { type: Number, required: true },
  // Date of request, required field
  date: { type: String, required: true },
  // Reason for the request, optional field
  reason: { type: String },
  // Status of the request, default is "Pending"
  status: {
    type: String,
    enum: ["Pending", "Approved", "Denied", "Completed"],
    default: "Pending",
  },
});

// Create model for Requests using the foodRequests schema
const Requests = mongoose.model("Requests", foodRequests);

// Export the Requests model
module.exports = Requests;
