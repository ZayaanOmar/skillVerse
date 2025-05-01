const router = require("express").Router();
const passport = require("passport");

/* Not sure if this will actually be needed
//auth login
router.get("/login", (req, res) => {
  //do something to login
});
*/

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

//no real purpose - just to display while testing
router.get("/", (req, res) => {
  res.send("This is the route used for 3rd Party Auth");
});

//auth logout
router.get("/logout", (req, res) => {
  //Handle with passport - will be done sometime in future (hopefully)
  res.send("Logging out");
});

//auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google to redirect to
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // to access currently logged in user : res.send(req.user)
  //res.send("You Reached the Callback URI");
  const isNewUser = req.user?.role === undefined; // Assuming role is not yet set for new users

  if (isNewUser) {
    res.redirect(`${FRONTEND_URL}/roles?userId=${req.user._id}`); // Frontend route for setting role
    //userID needs to be fetched for request purposes
  } else {
    const user_role = req.user.role;
    res.redirect(`${FRONTEND_URL}/${user_role}/home`);
  }
  // redirect the user to a certain page
  //res.redirect()
});
router.get("/me", (req, res) => {
  console.log("User Info:", req.user); // Log the user info for debugging
  console.log("Session Info:", req.session); // Log the session info for debugging

  //gets current logged in users info from session for reqs
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
