const { blogsModel } = require("../model/blogsSch");

const createBlogs = async (req, res) => {
  try {
    const { Title, Category, Date, Description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const UploadFile = `/uploads/${req.file.filename}`; // Store the file path in the database

    const newBlog = new blogsModel({
      Title,
      Category,
      Date,
      Description,
      Image: UploadFile,
    });

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getBlogs = async (req, res) => {
  try {
    const blogs = await blogsModel.find(); // Retrieve all blogs from the database

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId; // Get the blog ID from the URL parameter

    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { createBlogs, getBlogs, getBlogById };
