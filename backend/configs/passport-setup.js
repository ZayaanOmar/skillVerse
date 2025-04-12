const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      /*passport callback function
       * accessToken: received from google, allows us to alter user's profile
       * refreshToken: refresh accessToken (accessToken expires)
       * profile: information that passport retrieves about user profile
       * done: function we must call when we are done with this callback function
       */

      const existingUser = await User.findOne({ googleID: profile.id });

      if (existingUser) {
        //user already exists, must be logged in
        console.log(`Logging in User ${profile.id}`);
      } else {
        //New User Registering
        const newUser = new User({
          googleID: profile.id,
          username: profile.displayName,
        });
        await newUser.save();
        console.log(`New User Created: ${newUser}`);
      }
    }
  )
);
