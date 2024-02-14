const mongoose = require("mongoose");

// Import the comment schema
const { Schema } = mongoose;
const { commentSchema } = require("./commentSch");

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
    // Reference to comments
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  { timestamps: true }
);

const blogsModel = mongoose.model("Blog", blogsSchema);
module.exports = { blogsModel };