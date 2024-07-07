const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router instance
const {
  register,
  login,
  logout,
  loggedIn,
} = require("../controllers/authController"); // Importing controller functions from authController

// Register route
router.post("/:handle", register); // POST request to register a new user or food bank, depending on the handle parameter

// Log in route
router.post("/login/:handle", login); // POST request to log in as a user or food bank, depending on the handle parameter

// Log out route
router.get("/logout", logout); // GET request to log out the currently logged-in user or food bank

// Check logged in status route
router.get("/loggedIn", loggedIn); // GET request to check if a user or food bank is currently logged in

module.exports = router; // Exporting the router instance with defined routes
