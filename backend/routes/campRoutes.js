const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router instance
const auth = require("../middleware/auth"); // Importing authentication middleware
const campController = require("../controllers/campController"); // Importing campController for handling camp-related operations

// Create a new camp route
router.post("/", auth, campController.createCamp); // POST request to create a new camp, authenticated using auth middleware

// Get camps by state and district (or all camps for the authenticated user) route
router.get("/:state?/:district?", auth, campController.getCamps);
// GET request to retrieve camps based on optional state and district parameters, authenticated using auth middleware

// Get all camps by state, district, and date route
router.get(
  "/allCamps/:state/:district/:date",
  campController.getAllCampsByDate
);
// GET request to retrieve all camps based on state, district, and date parameters

// Update camp (add donor or update donor details) route
router.put("/:id/:userId?", auth, campController.updateCamp);
// PUT request to update camp details or add a donor, authenticated using auth middleware

module.exports = router; // Exporting the router instance with defined routes
