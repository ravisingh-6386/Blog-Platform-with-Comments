const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json({ comments });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      post: postId,
      user: req.user.id,
    });

    const populatedComment = await comment.populate("user", "name email");

    return res.status(201).json({ comment: populatedComment });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment id" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (String(comment.user) !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own comments" });
    }

    await comment.deleteOne();

    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsByPost,
  createComment,
  deleteComment,
};
