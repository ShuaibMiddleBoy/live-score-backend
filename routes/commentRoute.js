const express = require("express");
const commentRouter = express.Router();
const { createComment, getCommentsByBlogId } = require("../controller/comment");

// Route to create a new comment for a specific blog
commentRouter.post('/:blogId/create-comment', createComment);

// Route to get all comments for a specific blog
commentRouter.get('/:blogId/get-comments', getCommentsByBlogId);

module.exports = { commentRouter };