import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setIsSubmitting(true);
      await login(formData);
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath, { replace: true });
    } catch (submitError) {
      setError(
        submitError.response?.data?.message ||
          "Unable to reach server. Start backend and check API URL."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card form-card">
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit} className="form-layout">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>
      <p className="muted-text">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
};

export default LoginPage;
