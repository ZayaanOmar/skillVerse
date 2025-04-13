// !! NB !! - This file might not even be necessary with the 3rd party implementation
const express = require("express");
const { addUser, updateUser, logIn, authCheck } = require("../controllers/user_controller");
const router = express.Router();

//Example route for adding user to database

// redirect to homepage
router.get("/homepage",authCheck, logIn);

router.post("/", addUser);

router.put("/:id", updateUser);

module.exports = router;
