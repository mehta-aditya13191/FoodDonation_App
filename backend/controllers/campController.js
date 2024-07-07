const Camp = require("../models/campSchma"); // Import Camp model

// Create a new camp
const createCamp = async (req, res) => {
  try {
    req.body.bankId = req.user; // Set the bankId from logged-in user
    req.body.donors = []; // Initialize donors array
    const newCamp = new Camp(req.body); // Create new Camp instance
    await newCamp.save(); // Save new camp to the database
    res.status(200).send(); // Respond with success status
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send(); // Respond with server error status
  }
};

// Get camps based on state, district, or bankId
const getCamps = async (req, res) => {
  try {
    let query = {};
    if (req.params.state) {
      query.state = req.params.state; // Add state to query if provided
      query.district = req.params.district; // Add district to query if provided
    } else {
      query.bankId = req.user; // Filter by bankId from logged-in user
    }
    const data = await Camp.find(query) // Find camps based on query
      .populate("bankId", "-_id -__v -password -requests -donations -stock") // Populate bankId field excluding sensitive data
      .populate({
        path: "donors._id",
        select: "-__v -password", // Populate donors excluding sensitive data
      });
    res.json(data); // Respond with camp data
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send(); // Respond with server error status
  }
};

// Get all camps for a specific date
const getAllCampsByDate = async (req, res) => {
  try {
    if (req.params.date) {
      const data = await Camp.find(
        // Find camps based on date, state, and district
        {
          state: req.params.state,
          district: req.params.district,
          date: new Date(req.params.date), // Convert date string to Date object
        },
        { donors: 0, _id: 0 } // Exclude donors and _id fields from result
      )
        .populate("bankId", "-donations -requests -stock") // Populate bankId excluding sensitive data
        .select("-_id -password"); // Exclude _id and password fields from result
      res.json(data); // Respond with camp data
    } else {
      res.json({}); // Respond with empty object if date is not provided
    }
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send(); // Respond with server error status
  }
};

// Update camp with new donor information
const updateCamp = async (req, res) => {
  try {
    if (req.params.userId) {
      // If userId is provided in params, update donor information
      await Camp.update(
        {
          _id: req.params.id, // Find camp by id
          donors: { $elemMatch: { _id: req.params.userId, status: 0 } }, // Match donor by userId and status 0 (pending)
        },
        { $set: { "donors.$.units": req.body.units, "donors.$.status": 1 } } // Update donor units and set status to 1 (approved)
      );
    } else {
      const campExists = await Camp.findOne({
        // Check if camp exists for logged-in user
        _id: req.params.id, // Find camp by id
        donors: { $elemMatch: { _id: req.user } }, // Match donor by logged-in user
      });
      if (!campExists) {
        await Camp.updateOne(
          // Add logged-in user as donor if not already exists
          { _id: req.params.id }, // Find camp by id
          { $push: { donors: { _id: req.user } } } // Push new donor into donors array
        );
      }
    }
    res.status(200).send(); // Respond with success status
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).send(); // Respond with server error status
  }
};

module.exports = {
  createCamp,
  getCamps,
  getAllCampsByDate,
  updateCamp,
};
