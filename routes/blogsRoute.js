const express = require("express");
const blogsRouter = express.Router();
const multer = require("multer");
const { authenticateJWT } = require("../middleware/middleware");
const { createBlogs, getBlogs, getBlogById } = require("../controller/blogs");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogsRouter.post(
  "/create-blogs",
  authenticateJWT,
  upload.single("Image"),
  createBlogs
);
blogsRouter.get("/get-blogs", getBlogs);
blogsRouter.get("/get-blog/:blogId", getBlogById);

module.exports = { blogsRouter };
