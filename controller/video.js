const { videoModel } = require("../model/videoSch");

const createVideo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded." });
    }

    const videoFile = `/video-uploads/${req.file.filename}`; // Store the video file path in the database

    const newVideo = new videoModel({
      title,
      video: videoFile,
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error creating video:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error getting videos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createVideo, getVideos };