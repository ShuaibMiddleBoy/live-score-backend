const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    PhoneNo: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const contactModel = mongoose.model("contact", contactSchema);
module.exports = { contactModel };
