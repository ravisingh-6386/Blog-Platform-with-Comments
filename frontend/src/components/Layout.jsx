import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand-link">
          InkSphere
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && <NavLink to="/posts/new">Write</NavLink>}
        </nav>

        <div className="user-actions">
          {isAuthenticated ? (
            <>
              <span className="welcome-text">Hi, {user?.name}</span>
              <button type="button" className="btn ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn ghost" to="/login">
                Login
              </Link>
              <Link className="btn" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="content-wrap">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
