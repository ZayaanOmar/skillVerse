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

app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  credentials: true,               // Allow cookies/session info
}));

app.use(express.json()); //middleware that allows us to accept JSON data in req.body

// use cookies
//lifetime of the cookie is one day and encrypt key
app.use(
  session({
    secret: process.env.cookieKey,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// initialize passport and then use cookies
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

//test route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB(); //connects to the database
  console.log(`Server running on port ${PORT}`);
});
