const express = require("express");
const videoRouter = express.Router();
const multer = require("multer");
const { authenticateJWT } = require("../middleware/middleware");
const { createVideo,getVideos } = require("../controller/video");

// Set up multer storage for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "video-uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

videoRouter.post(
  "/create-video",
  authenticateJWT,
  upload.single("video"),
  createVideo
);
videoRouter.get(
  "/get-videos",
  getVideos
);

module.exports = { videoRouter };