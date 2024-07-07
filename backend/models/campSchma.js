// Import mongoose module
const mongoose = require("mongoose");

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
  // Contact number for the camp organizer, required field
  contact: { type: Number, required: true },
  // Start time of the camp, required field
  startTime: { type: String, required: true },
  // End time of the camp, required field
  endTime: { type: String, required: true },
  // List of donors participating in the camp
  donors: [
    {
      // Reference to the User who is a donor, required to be unique
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Users", unique: true },
      // Number of units donated by the donor, default is 0
      units: { type: Number, required: true, default: 0 },
      // Status of the donation, where 0 = Pending and 1 = Completed, default is 0
      status: { type: Number, enum: [0, 1], default: 0 },
    },
  ],
});

// Create model for Camps using the campSchema
const Camp = mongoose.model("Camps", campSchema);

// Export the Camp model
module.exports = Camp;
