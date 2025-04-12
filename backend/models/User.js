const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleID: {
      //google ID returned from Google during OAuth authentication
      type: String,
      required: true,
      unique: true,
    },
    username: {
      //will be created on first login (sign up)
      type: String,
      required: true,
      unique: true, // will be enforced at the DB level
    },
    role: {
      //will be chosen on first login (signup)
      type: String,
      enum: ["client", "freelancer", "admin"], //value must be one of these options
      required: true,
    },
  },
  {
    timestamps: true, //stores created at, updated at information (maybe not necessary)
  }
);

//tells mongoose to create a new collection called "users", and to use the previously defined schema
//export default mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
//export default User;
