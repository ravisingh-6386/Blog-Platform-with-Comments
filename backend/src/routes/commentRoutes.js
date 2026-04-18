const express = require("express");
const { deleteComment } = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.delete("/comments/:commentId", authMiddleware, deleteComment);

module.exports = router;
