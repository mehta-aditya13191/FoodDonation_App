const express = require("express"); // Importing Express framework
const router = express.Router(); // Creating an Express router instance
const auth = require("../middleware/auth"); // Importing authentication middleware
const foodBankController = require("../controllers/foodBankController"); // Importing foodBankController for handling food bank operations

router.post("/:handle", auth, foodBankController.filterController);
// POST request to filter banks based on handle (user type), authenticated using auth middleware

// Get all banks by state and district route
router.get("/allBanks/:state/:district", foodBankController.getAllBanks);
// GET request to retrieve all banks based on state and district parameters

// Update stock route
router.put("/updateStock", auth, foodBankController.updateStock);
// PUT request to update stock of a food bank, authenticated using auth middleware

// Delete stock route
router.put("/deleteStock", auth, foodBankController.deleteStock);
// PUT request to delete stock of a food bank, authenticated using auth middleware

// Get stock route
router.get("/getStock", auth, foodBankController.getStock);
// GET request to retrieve stock of a food bank, authenticated using auth middleware

// Update donation status route
router.put("/donations", auth, foodBankController.updateDonationStatus);
// PUT request to update donation status, authenticated using auth middleware

// Update request status route
router.put("/requests", auth, foodBankController.updateRequestStatus);
// PUT request to update request status, authenticated using auth middleware

// Get donation status route
router.get("/donations", auth, foodBankController.getDonationStatus);
// GET request to retrieve donation status, authenticated using auth middleware

// Get request status route
router.get("/requests", auth, foodBankController.getRequestStatus);
// GET request to retrieve request status, authenticated using auth middleware

// Update food bank route
router.put("/", auth, foodBankController.updateFoodBank);
// PUT request to update food bank details, authenticated using auth middleware

module.exports = router; // Exporting the router instance with defined routes
