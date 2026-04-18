const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getPosts = async (_req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.json({ post, comments });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const populatedPost = await post.populate("author", "name email");

    return res.status(201).json({ post: populatedPost });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (String(post.author) !== req.user.id) {
      return res.status(403).json({ message: "You can edit only your own posts" });
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    await post.save();

    const populatedPost = await post.populate("author", "name email");

    return res.json({ post: populatedPost });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (String(post.author) !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own posts" });
    }

    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
