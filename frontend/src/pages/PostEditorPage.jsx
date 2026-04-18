import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPost, fetchPostById, updatePost } from "../api/postApi";

const PostEditorPage = () => {
  const { postId } = useParams();
  const isEditMode = Boolean(postId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const loadPost = async () => {
      try {
        const response = await fetchPostById(postId);
        setFormData({ title: response.post.title, content: response.post.content });
      } catch (_error) {
        setError("Failed to load post for editing");
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [isEditMode, postId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);

      if (isEditMode) {
        await updatePost(postId, formData);
        navigate(`/posts/${postId}`);
      } else {
        const response = await createPost(formData);
        navigate(`/posts/${response.post._id}`);
      }
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="muted-text">Loading editor...</p>;
  }

  return (
    <section className="card form-card editor-card">
      <h1>{isEditMode ? "Edit Post" : "Write a New Post"}</h1>
      <form onSubmit={handleSubmit} className="form-layout">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={12}
          required
          value={formData.content}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <div className="editor-actions">
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Post"}
          </button>
          <Link className="btn ghost" to={isEditMode ? `/posts/${postId}` : "/"}>
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default PostEditorPage;
