require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./configs/passport-setup");
const { connectDB } = require("./configs/db-conn");
const User = require("./models/User.js");
const userRoutes = require("./routes/user-routes");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Get the frontend URL from environment variable or fallback to localhost for development
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Use more secure cookie settings in production
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 100,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Health check endpoint for Azure
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", message: "API is running" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Azure Static Web Apps expects a module.exports
if (process.env.NODE_ENV === "production") {
  module.exports = app;
} else {
  // For local development, start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
  });
}
