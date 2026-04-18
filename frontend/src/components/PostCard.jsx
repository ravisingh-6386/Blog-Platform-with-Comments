import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const summary =
    post.content.length > 180 ? `${post.content.slice(0, 180)}...` : post.content;

  return (
    <article className="card post-card">
      <h2>{post.title}</h2>
      <p className="post-meta">
        By {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleString()}
      </p>
      <p>{summary}</p>
      <Link className="btn" to={`/posts/${post._id}`}>
        Read More
      </Link>
    </article>
  );
};

export default PostCard;
