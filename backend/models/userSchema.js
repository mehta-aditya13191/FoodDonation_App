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

// Export the User model
module.exports = User;
