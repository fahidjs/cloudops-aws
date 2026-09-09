import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  }

  return (
    <header className="navbar">
      <div>
        <h1>Support Dashboard</h1>
        <p>Monitor and manage IT support tickets.</p>
      </div>

      <div className="navbar-actions">
        <div className="navbar-user">
          <div className="user-avatar">
            {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <strong>{user?.email || "CloudOps User"}</strong>

            <span>{user?.role === "ADMIN" ? "Administrator" : "Employee"}</span>
          </div>
        </div>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
