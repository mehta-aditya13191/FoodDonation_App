// const express = require("express");
// const colors = require("colors");
// const cors = require("cors");
// const dotenv = require("dotenv");
// // const mongoose = require("mongoose");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");

// const authRoutes = require("./routes/authRoutes");
// const foodBankRoutes = require("./routes/foodBankRoutes");
// const campRoutes = require("./routes/campRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();
// // const port = 3177;

// dotenv.config();

// //database connection
// database.connectDB();

// app.use(cookieParser());
// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   })
// );

// app.use("/auth", authRoutes);
// app.use("/bank", foodBankRoutes);
// app.use("/camps", campRoutes);
// app.use("/user", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to FoodBank!"); // Example response
// });

// //server is running at
// const PORT = process.env.PORT || 3177;

// app.listen(PORT, () => {
//   console.log(
//     `server is running on  ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan
//       .white
//   );
// });

const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const foodBankRoutes = require("./routes/foodBankRoutes");
const campRoutes = require("./routes/campRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();

// Database connection
database.connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/bank", foodBankRoutes);
app.use("/camps", campRoutes);
app.use("/user", userRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.send("Welcome to FoodBank!"); // Example response
});

// The catch-all handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Server is running at
const PORT = process.env.PORT || 3177;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan
      .white
  );
});
