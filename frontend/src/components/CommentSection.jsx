import { useState } from "react";
import { createComment, deleteComment } from "../api/postApi";
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ postId, comments, onCommentsUpdated }) => {
  const { user, isAuthenticated } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!commentText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);
      await createComment(postId, { content: commentText.trim() });
      setCommentText("");
      onCommentsUpdated();
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      onCommentsUpdated();
    } catch (_deleteError) {
      setError("Failed to delete comment");
    }
  };

  return (
    <section className="card comments-wrap">
      <h3>Comments</h3>

      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            rows={3}
            placeholder="Share your thoughts"
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <p className="muted-text">Login to join the conversation.</p>
      )}

      <div className="comment-list">
        {comments.length === 0 ? (
          <p className="muted-text">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <article className="comment-item" key={comment._id}>
              <div>
                <p className="post-meta">
                  {comment.user?.name || "Unknown"} · {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>{comment.content}</p>
              </div>
              {user?.id === comment.user?._id && (
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
