function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>CloudOps</h2>
        <span>IT Support</span>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          Dashboard
        </button>

        <button className="nav-item">
          My Tickets
        </button>

        <button className="nav-item">
          Create Ticket
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;