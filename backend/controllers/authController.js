// Import necessary modules
const bcrypt = require("bcrypt"); // Module for hashing passwords
const jwt = require("jsonwebtoken"); // Module for generating and verifying JWTs
const User = require("../models/userSchema"); // Import User model
const FoodBank = require("../models/foodBankSchema"); // Import FoodBank model
require("dotenv").config(); // Load environment variables from .env file

// ------- Register Function -------

const register = async (req, res) => {
  try {
    // Get the type of registration (user or food bank) from URL parameter
    const handle = req.params.handle;

    // Check if a user or food bank with the given phone number already exists
    const existingUser =
      handle === "bank"
        ? await FoodBank.findOne({ phone: req.body.phone }) // Check in FoodBank collection
        : await User.findOne({ phone: req.body.phone }); // Check in User collection

    // If user or food bank already exists, return an error response
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this phone number already exists.",
      });
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt();
    // Hash the password with the generated salt
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    // Replace the plain text password with the hashed password
    req.body.password = passwordHash;

    // Create a new user or food bank object with the provided data
    const newUser =
      handle === "bank" ? new FoodBank(req.body) : new User(req.body);
    // Save the new user or food bank to the database
    const savedUser = await newUser.save();

    // Sign a new JWT token with the user ID and type
    const token = jwt.sign(
      { user: savedUser._id, type: handle },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration time
    );

    // Send the token in an HTTP-only cookie to the client
    res
      .cookie("token", token, {
        httpOnly: true, // Ensure cookie is only accessible by the web server
        secure: true, // Ensure cookie is sent over HTTPS
        sameSite: "none", // Allow cross-site requests
      })
      .send(); // Send the response
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    // Send a generic error response
    res.status(500).send();
  }
};

// ------- Login Function -------

const login = async (req, res) => {
  try {
    // Extract phone and password from request body
    const { phone, password } = req.body;
    // Get the type of login (user or food bank) from URL parameter
    const handle = req.params.handle;

    // Find the user or food bank with the given phone number
    const existingUser = await (handle == "bank"
      ? FoodBank.findOne({ phone }) // Find in FoodBank collection
      : User.findOne({ phone })); // Find in User collection

    // If user or food bank does not exist, return an error response
    if (!existingUser) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });
    }

    // Compare the provided password with the hashed password in the database
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // If the passwords do not match, return an error response
    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ errorMessage: "Wrong username or password." });
    }

    // Sign a new JWT token with the user ID and type
    const token = jwt.sign(
      { user: existingUser._id, type: handle },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Optional: Set token expiration time
    );

    // Send the token in an HTTP-only cookie to the client
    res
      .cookie("token", token, {
        httpOnly: true, // Ensure cookie is only accessible by the web server
        secure: true, // Ensure cookie is sent over HTTPS
        sameSite: "none", // Allow cross-site requests
      })
      .send(); // Send the response
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    // Send a generic error response
    res.status(500).send();
  }
};

// ------- Logout Function -------

const logout = (req, res) => {
  // Clear the token cookie to log out the user
  res
    .cookie("token", "", {
      httpOnly: true, // Ensure cookie is only accessible by the web server
      secure: true, // Ensure cookie is sent over HTTPS
      sameSite: "none", // Allow cross-site requests
    })
    .send(); // Send the response
  // Log the logout action to the console
  console.log("Logged Out");
};

// ------- Check Logged In Status Function -------

const loggedIn = async (req, res) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;
    // If no token is found, return an unauthorized response
    if (!token) return res.json({ auth: false });

    // Verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user or food bank based on the verified token data
    const user = await (verified.type == "bank" ? FoodBank : User).findOne(
      { _id: verified.user },
      { password: 0, donations: 0, requests: 0, stock: 0, __v: 0 } // Exclude sensitive fields
    );

    // Send the user data and authentication status in the response
    res.send({ auth: true, user });
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    // Send an unauthorized response
    res.json({ auth: false });
  }
};

// Export the functions for use in other modules
module.exports = {
  register,
  login,
  logout,
  loggedIn,
};
