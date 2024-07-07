// Import mongoose module
const mongoose = require("mongoose");

// ------- Donations Model -------

// Create schema for Donations
const foodDonations = new mongoose.Schema({
  // Reference to the User who made the donation, required field
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  // Reference to the Food Bank where the donation is made, required field
  bankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodBanks",
    required: true,
  },
  // Number of units donated, required field
  units: { type: Number, required: true },
  // Date of donation, required field
  date: { type: String, required: true },
  // Disease information related to the donation, optional field
  disease: { type: String },
  // Status of the donation, default is "Pending"
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Denied", "Donated"],
    default: "Pending",
  },
});

// Create model for Donations using the foodDonations schema
const Donations = mongoose.model("Donations", foodDonations);

// Export the Donations model
module.exports = Donations;
