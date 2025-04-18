const mongoose = require("mongoose");

const roleChangeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    currentRole: {
      //chosen on first login (signup)
      type: String,
    },
    requestedRole: {
      type: String,
      enum: ["client", "freelancer", "admin"], //value must be one of these options
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], default: "pending"
      //should be in ["pending", "approved", "rejected"]
    }
  },
  {
    timestamps: true, //stores created at, updated at information (maybe not necessary)
  }
);

//tells mongoose to create a new collection called "users", and to use the previously defined schema
module.exports = mongoose.model("ChangeRequest", roleChangeSchema);
