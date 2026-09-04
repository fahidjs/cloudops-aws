import { Link, useParams } from "react-router-dom";
import { mockTickets } from "../data/mockTickets";

function TicketDetailsPage() {
  const { ticketId } = useParams();

  const ticket = mockTickets.find(
    (item) => item.id === ticketId
  );

  if (!ticket) {
    return (
      <main className="ticket-details-page">
        <div className="page-header">
          <h1>Ticket Not Found</h1>
          <p>The requested support ticket could not be found.</p>
        </div>

        <Link to="/tickets" className="back-link">
          Back to My Tickets
        </Link>
      </main>
    );
  }

  return (
    <main className="ticket-details-page">
      <div className="ticket-details-top">
        <div>
          <Link to="/tickets" className="back-link">
            ← Back to My Tickets
          </Link>

          <div className="page-header ticket-details-heading">
            <span className="ticket-detail-id">
              {ticket.id}
            </span>

            <h1>{ticket.title}</h1>

            <p>
              View the details and current status of this support request.
            </p>
          </div>
        </div>
      </div>

      <div className="ticket-details-layout">
        <section className="ticket-details-card">
          <div className="detail-section">
            <h2>Description</h2>
            <p>{ticket.description}</p>
          </div>

          <div className="detail-section">
            <h2>Ticket Information</h2>

            <div className="detail-grid">
              <div className="detail-item">
                <span>Category</span>
                <strong>{ticket.category}</strong>
              </div>

              <div className="detail-item">
                <span>Priority</span>

                <strong>
                  <span
                    className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </strong>
              </div>

              <div className="detail-item">
                <span>Status</span>

                <strong>
                  <span
                    className={`status-badge status-${ticket.status
                      .toLowerCase()
                      .replace("_", "-")}`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </strong>
              </div>

              <div className="detail-item">
                <span>Created</span>

                <strong>
                  {new Date(ticket.createdAt).toLocaleString()}
                </strong>
              </div>
            </div>
          </div>
        </section>

        <aside className="ticket-meta-card">
          <h2>Requester</h2>

          <div className="requester-info">
            <div className="requester-avatar">
              {ticket.createdBy.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{ticket.createdBy}</strong>
              <span>Ticket requester</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default TicketDetailsPage;