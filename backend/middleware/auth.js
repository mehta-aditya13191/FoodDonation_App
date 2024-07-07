const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken package for JWT operations

// Middleware function for authentication
function auth(req, res, next) {
  try {
    const token = req.cookies.token; // Extracting JWT token from cookies in the request
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" }); // Respond with unauthorized error if token is not present

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifying the JWT token using the secret stored in environment variables
    req.user = verified.user; // Extracting the user ID from the verified token and attaching it to the request object

    next(); // Calling next to pass control to the next middleware function
  } catch (err) {
    console.error(err); // Logging any errors to the console
    res.status(401).json({ errorMessage: "Unauthorized" }); // Responding with unauthorized error if token verification fails
  }
}

module.exports = auth; // Exporting the auth middleware function for use in other parts of the application
