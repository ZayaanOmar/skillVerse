require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./configs/passport-setup");
const { connectDB } = require("./configs/db-conn");
//const User = require("./models/User");
const userRoutes = require("./routes/user-routes");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const serviceRequestRoutes = require("./routes/service-request-routes");
const paymentRoutes = require("./routes/payment-routes")
//const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const app = express();

//Testing for stripe payment
const Items = new Map([
  [1, {priceInCents: 10000, name: "Software Developer"}],
  [2, {priceInCents: 20000, name: "Graphics Designer"}]
])
//

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    credentials: true, // Allow cookies/session info
  })
);

app.use(express.json()); //middleware that allows us to accept JSON data in req.body

// use cookies
// lifetime of the cookie is one day and encrypt key
app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// initialize passport and then use cookies
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

//set up payment routes
app.use("/payments", paymentRoutes);

// Set up the service request routes (this should be before the app.listen)
app.use("/api/service-requests", serviceRequestRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB(); // Connects to the database
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;