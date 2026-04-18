const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const {
  getCommentsByPost,
  createComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

router.get("/:postId/comments", getCommentsByPost);
router.post("/:postId/comments", authMiddleware, createComment);

module.exports = router;
