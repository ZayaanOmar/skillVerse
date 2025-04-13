const router = require("express").Router();
const passport = require("passport");

/* Not sure if this will actually be needed
//auth login
router.get("/login", (req, res) => {
  //do something to login
});
*/

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
  res.send("You Reached the Callback URI");
  // redirect the user to a certain page
  //res.redirect()
});

module.exports = router;
