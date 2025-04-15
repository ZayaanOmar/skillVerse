const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Get the frontend URL from environment variable or fallback to localhost for development
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const NODE_ENV = process.env.NODE_ENV || "development";

// Set callback URL based on environment
const callbackURL = "/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      callbackURL: callbackURL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleID: profile.id });

        if (existingUser) {
          console.log(`Logging in User ${profile.id}`);
          return done(null, existingUser);
        } else {
          const newUser = new User({
            googleID: profile.id,
            username: profile.displayName,
          });
          await newUser.save();
          console.log(`New User Created: ${newUser}`);
          return done(null, newUser);
        }
      } catch (error) {
        console.error("Error in Google strategy callback:", error);
        return done(error, null);
      }
    }
  )
);
