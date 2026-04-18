import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPostById } from "../api/postApi";
import CommentSection from "../components/CommentSection";
import { useAuth } from "../context/AuthContext";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPostData = async () => {
    try {
      setError("");
      const response = await fetchPostById(postId);
      setPost(response.post);
      setComments(response.comments || []);
    } catch (_error) {
      setError("Failed to load post details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleDeletePost = async () => {
    const shouldDelete = window.confirm("Delete this post permanently?");

    if (!shouldDelete) {
      return;
    }

    try {
      await deletePost(postId);
      navigate("/");
    } catch (_error) {
      setError("Failed to delete post");
    }
  };

  if (isLoading) {
    return <p className="muted-text">Loading post...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!post) {
    return <p className="muted-text">Post not found.</p>;
  }

  const isOwner = isAuthenticated && user?.id === post.author?._id;

  return (
    <section className="post-details">
      <article className="card details-card">
        <h1>{post.title}</h1>
        <p className="post-meta">
          By {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleString()}
        </p>

        <p className="post-content">{post.content}</p>

        {isOwner && (
          <div className="editor-actions">
            <Link className="btn" to={`/posts/${post._id}/edit`}>
              Edit Post
            </Link>
            <button type="button" className="btn danger" onClick={handleDeletePost}>
              Delete Post
            </button>
          </div>
        )}
      </article>

      <CommentSection postId={postId} comments={comments} onCommentsUpdated={loadPostData} />
    </section>
  );
};

export default PostDetailsPage;
