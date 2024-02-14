const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    Comment: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
}, { timestamps: true });

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel };