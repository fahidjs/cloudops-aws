import type { Ticket } from "../types/ticket";
import { Link } from "react-router-dom";

interface TicketTableProps {
  tickets: Ticket[];
}

function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="ticket-section">
      <div className="ticket-section-header">
        <div>
          <h2>Recent Tickets</h2>
          <p>Latest IT support requests.</p>
        </div>

        <button className="view-all-button">View All</button>
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
              <th>Created By</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticketId}>
                <td className="ticket-id">
                  <Link to={`/tickets/${ticket.ticketId}`} className="ticket-link">
                    {ticket.ticketId}
                  </Link>
                </td>

                <td>{ticket.title}</td>

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

                <td>{ticket.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketTable;
