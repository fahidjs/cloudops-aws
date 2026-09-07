import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/ticketService";
import type { Ticket } from "../types/ticket";

function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets();

        const sortedTickets = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        setTickets(sortedTickets);
      } catch (err) {
        console.error(err);
        setError("Unable to load tickets.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  return (
    <main className="my-tickets-page">
      <div className="page-header">
        <h1>My Tickets</h1>
        <p>View and track your submitted IT support requests.</p>
      </div>

      {loading && <div className="api-message">Loading tickets...</div>}

      {error && <div className="api-message api-error">{error}</div>}

      {!loading && !error && (
        <div className="my-tickets-card">
          <div className="my-tickets-header">
            <div>
              <h2>Your Support Tickets</h2>
              <p>{tickets.length} tickets found</p>
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
                {tickets.map((ticket) => (
                  <tr key={ticket.ticketId}>
                    <td className="ticket-id">
                      <Link
                        to={`/tickets/${ticket.ticketId}`}
                        className="ticket-link"
                      >
                        {ticket.ticketId}
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
      )}
    </main>
  );
}

export default MyTicketsPage;
