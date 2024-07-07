const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router instance
const auth = require("../middleware/auth"); // Importing authentication middleware
const userController = require("../controllers/userController"); // Importing userController for handling user operations

// Get current user route
router.get("/", auth, userController.getUserById);
// GET request to retrieve current user details, authenticated using auth middleware

// Donate route
router.post("/donate", auth, userController.donate);
// POST request to make a donation, authenticated using auth middleware

// Request route
router.post("/request", auth, userController.request);
// POST request to make a request, authenticated using auth middleware

// Get user's donations route
router.get("/donations", auth, userController.getDonations);
// GET request to retrieve user's donations, authenticated using auth middleware

// Get user's requests route
router.get("/requests", auth, userController.getRequests);
// GET request to retrieve user's requests, authenticated using auth middleware

// Update user route
router.put("/", auth, userController.updateUser);
// PUT request to update user details, authenticated using auth middleware

module.exports = router; // Exporting the router instance with defined routes
