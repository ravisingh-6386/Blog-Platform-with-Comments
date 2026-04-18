import { useEffect, useState } from "react";
import { fetchPosts } from "../api/postApi";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.posts || []);
      } catch (_error) {
        setError("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <p className="muted-text">Loading posts...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <section>
      <div className="page-head">
        <h1>Stories That Spark Conversations</h1>
        <p>Read, publish, and engage with thoughtful posts from the community.</p>
      </div>

      <div className="post-grid">
        {posts.length === 0 ? (
          <p className="muted-text">No posts yet. Be the first to publish.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
};

export default HomePage;
