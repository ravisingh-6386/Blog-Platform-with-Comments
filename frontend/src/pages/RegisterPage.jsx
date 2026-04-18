import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      await register(formData);
      navigate("/");
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
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit} className="form-layout">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
        />

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
          minLength={6}
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Register"}
        </button>
      </form>
      <p className="muted-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
