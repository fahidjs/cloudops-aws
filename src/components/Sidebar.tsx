import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CloudOps</h2>
        <span>IT Support</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          My Tickets
        </NavLink>

        <NavLink
          to="/create-ticket"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          Create Ticket
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;