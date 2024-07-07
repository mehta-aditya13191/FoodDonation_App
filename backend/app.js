const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
// const mongoose = require("mongoose");
const database = require("./config/database");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const foodBankRoutes = require("./routes/foodBankRoutes");
const campRoutes = require("./routes/campRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
// const port = 3177;

dotenv.config();

//database connection
database.connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// mongoose.connect(
//   process.env.MONGODB_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   (e) => {
//     console.log(e ? e : "Connected successfully to database");
//   }
// );

// app.use("/auth", require("./routers/authRouter"));
// app.use("/user", require("./routers/userRouter"));
// app.use("/bank", require("./routers/bankRouter"));
// app.use("/camps", require("./routers/campRouter"));

app.use("/auth", authRoutes);
app.use("/bank", foodBankRoutes);
app.use("/camps", campRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to FoodBank!"); // Example response
});

//server is running at
const PORT = process.env.PORT || 3177;

// app.listen(port, () =>
//   console.log(`Server running at http://localhost:${port}`)
// );

app.listen(PORT, () => {
  console.log(
    `server is running on  ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan
      .white
  );
});
