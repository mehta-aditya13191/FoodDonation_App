// Import mongoose module
const mongoose = require("mongoose");

// Define an array of food groups for validation in the schemas
const foodGroups = [
  "Non-Perishable Food",
  "Perishable Food",
  "Prepared Food",
  "Baby Food and Formula",
  "Snacks and Beverages",
];

// Define an initial stock object for food groups
const stock = {
  "Non-Perishable Food": 0,
  "Perishable Food": 0,
  "Prepared Food": 0,
  "Baby Food and Formula": 0,
  "Snacks and Beverages": 0,
};

// ------- User Model -------

// Create schema for Users
const userSchema = new mongoose.Schema({
  // User's name, required field
  name: { type: String, required: true },
  // User's age, required field
  age: { type: Number, required: true },
  // User's gender, required field
  gender: { type: String, required: true },
  // Food group the user is associated with, must be one of the defined foodGroups, required field
  foodGroup: { type: String, enum: foodGroups, required: true },
  // User's email, optional field
  email: { type: String },
  // User's phone number, must be unique, required field
  phone: { type: Number, unique: true, required: true },
  // User's password, required field
  password: { type: String, required: true },
  // User's state, required field
  state: { type: String, required: true },
  // User's district, required field
  district: { type: String, required: true },
  // User's address, optional field
  address: { type: String },
});

// Create model for Users using the userSchema
const User = mongoose.model("Users", userSchema);

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
  // Condition of the donated food, optional field
  foodCondition: { type: String },
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

// ------- Food Bank Model -------

// Create schema for Food Banks
const foodBankSchema = new mongoose.Schema({
  // Name of the food bank, required field
  name: { type: String, required: true },
  // Associated hospital, required field
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
    rice: { type: Number, default: 0 },
    wheat: { type: Number, default: 0 },
    vegetables: { type: Number, default: 0 },
    fruits: { type: Number, default: 0 },
    dairy: { type: Number, default: 0 },
    meat: { type: Number, default: 0 },
    fish: { type: Number, default: 0 },
    snacks: { type: Number, default: 0 },
  },
});

// Create model for Food Banks using the foodBankSchema
const FoodBank = mongoose.model("FoodBanks", foodBankSchema);

// ------- Camp Model -------

// Create schema for Camps
const campSchema = new mongoose.Schema({
  // Name of the camp, required field
  name: { type: String, required: true },
  // Date of the camp, required field
  date: { type: Date, required: true },
  // Address where the camp is held, required field
  address: { type: String, required: true },
  // State where the camp is held, required field
  state: { type: String, required: true },
  // District where the camp is held, required field
  district: { type: String, required: true },
  // Reference to the Food Bank organizing the camp
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodBanks" },
  // Organizer of the camp, required field
  organizer: { type: String, required: true },
  // Contact number for the camp, required field
  contact: { type: Number, required: true },
  // Start time of the camp, required field
  startTime: { type: String, required: true },
  // End time of the camp, required field
  endTime: { type: String, required: true },
  // List of donors participating in the camp
  donors: [
    {
      // Reference to the User who is donating, must be unique
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", unique: true },
      // Number of units donated, default is 0
      units: { type: Number, required: true, default: 0 },
      // Status of the donation, 0 for pending, 1 for completed
      status: { type: Number, enum: [0, 1], default: 0 },
    },
  ],
});

// Create model for Camps using the campSchema
const Camp = mongoose.model("Camps", campSchema);

// Export the models
module.exports = { User, Donations, Requests, FoodBank, Camp };
