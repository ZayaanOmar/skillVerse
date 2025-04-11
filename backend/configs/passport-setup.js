const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
//require("../dotenv").config(); /* not sure if this is actually needed */

passport.use(
  new GoogleStrategy(
    {
      //options for the strategy
      callbackURL: "/auth/google/callback",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      /*passport callback function
       * accessToken: received from google, allows us to alter user's profile
       * refreshToken: refresh accessToken (accessToken expires)
       * profile: information that passport retrieves about user profile
       * done: function we must call when we are done with this callback function
       */
      console.log(profile);
    }
  )
);
