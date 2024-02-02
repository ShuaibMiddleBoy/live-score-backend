const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  video: {
    type: String,
    required: true,
  },
});

const videoModel = mongoose.model("videos", videoSchema);
module.exports = { videoModel };
