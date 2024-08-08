// Import mongoose module
const mongoose = require("mongoose");

// ------- Food Bank Model -------

// Create schema for Food Banks
const foodBankSchema = new mongoose.Schema({
  // Name of the food bank, required field
  name: { type: String, required: true },
  // Associated hospital, required field
  // hospital: { type: String, required: true },
  hospital: { type: String, required: true },
  // Contact person, optional field
  contactPerson: { type: String },
  // Category of the food bank, required field
  category: { type: String, required: true },
  // Website of the food bank, optional field
  website: { type: String },
  // Phone number of the food bank, required field
  phone: { type: Number, required: true },
  // Email of the food bank, required field
  email: { type: String, required: true },
  // Password for the food bank account, required field
  password: { type: String, required: true },
  // State where the food bank is located, required field
  state: { type: String, required: true },
  // District where the food bank is located, required field
  district: { type: String, required: true },
  // Address of the food bank, required field
  address: { type: String, required: true },
  // Latitude coordinate of the food bank, required field
  latitude: { type: Number, required: true },
  // Longitude coordinate of the food bank, required field
  longitude: { type: Number, required: true },
  // List of requests associated with the food bank
  requests: [
    {
      requestId: { type: mongoose.Schema.Types.ObjectId, ref: "Requests" },
    },
  ],
  // List of donations associated with the food bank
  donations: [
    {
      donationId: { type: mongoose.Schema.Types.ObjectId, ref: "Donations" },
    },
  ],
  // Stock levels for various food items, default to 0
  stock: {
    "Non-Perishable Food": { type: Number, default: 0 },
    "Perishable Food": { type: Number, default: 0 },
    "Prepared Food": { type: Number, default: 0 },
    "Baby Food and Formula": { type: Number, default: 0 },
    "Snacks and Beverages": { type: Number, default: 0 },
  },
});

// Create model for Food Banks using the foodBankSchema
const FoodBank = mongoose.model("FoodBanks", foodBankSchema);

// Export the FoodBank model
module.exports = FoodBank;
