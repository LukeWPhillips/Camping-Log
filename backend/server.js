const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();

// connect to database
connectDB();

// middleware

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// test get request in postman

app.get("/", (req, res) => {
  res.send("Welcome to the Camping Log App");
});

// Routes -

// connected to routes file
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users/campsites", require("./routes/campsiteRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Campsite API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
