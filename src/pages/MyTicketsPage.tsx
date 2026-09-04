import { mockTickets } from "../data/mockTickets";
import { Link } from "react-router-dom";

function MyTicketsPage() {
  return (
    <main className="my-tickets-page">
      <div className="page-header">
        <h1>My Tickets</h1>
        <p>View and track your submitted IT support requests.</p>
      </div>

      <div className="my-tickets-card">
        <div className="my-tickets-header">
          <div>
            <h2>Your Support Tickets</h2>
            <p>{mockTickets.length} tickets found</p>
          </div>
        </div>

        <div className="ticket-table-wrapper">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Issue</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {mockTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="ticket-id">
                    <Link to={`/tickets/${ticket.id}`} className="ticket-link">
                      {ticket.id}
                    </Link>
                  </td>

                  <td>
                    <div className="ticket-title-cell">
                      <strong>{ticket.title}</strong>
                      <span>{ticket.description}</span>
                    </div>
                  </td>

                  <td>{ticket.category}</td>

                  <td>
                    <span
                      className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge status-${ticket.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </td>

                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default MyTicketsPage;
