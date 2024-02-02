const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
      unique: true,
    },
    Category: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogsModel = mongoose.model("Blog", blogsSchema);
module.exports = { blogsModel };
