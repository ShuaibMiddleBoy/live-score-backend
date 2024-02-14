const { commentModel } = require("../model/commentSch");

const createComment = async (req, res) => {
  try {
    const { Comment } = req.body;
    const { blogId } = req.params;

    // Validate if the Comment field exists
    if (!Comment || !blogId) {
      return res.status(400).json({ message: "Comment and blogId fields are required" });
    }

    // Create a new comment instance
    const newComment = new commentModel({
      Comment,
      blogId
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const comments = await commentModel.find({ blogId }); 
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments for blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createComment, getCommentsByBlogId };
