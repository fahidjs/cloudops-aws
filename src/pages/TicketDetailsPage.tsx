import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTicket, updateTicketStatus } from "../services/ticketService";

import type { Ticket, TicketStatus } from "../types/ticket";

function TicketDetailsPage() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadTicket() {
      if (!ticketId) {
        setError("Ticket ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await getTicket(ticketId);

        setTicket(data);
      } catch (err) {
        console.error(err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load ticket.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [ticketId]);

  async function handleStatusChange(newStatus: TicketStatus) {
    if (!ticket) {
      return;
    }

    try {
      setUpdatingStatus(true);
      setStatusMessage("");

      const updatedTicket = await updateTicketStatus(
        ticket.ticketId,
        newStatus,
      );

      setTicket(updatedTicket);

      setStatusMessage("Ticket status updated successfully.");
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setStatusMessage(err.message);
      } else {
        setStatusMessage("Unable to update ticket status.");
      }
    } finally {
      setUpdatingStatus(false);
    }
  }

  if (loading) {
    return (
      <main className="ticket-details-page">
        <div className="api-message">Loading ticket...</div>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className="ticket-details-page">
        <div className="page-header">
          <h1>Ticket Not Found</h1>

          <p>{error || "The ticket could not be found."}</p>
        </div>

        <Link to="/tickets" className="back-link">
          ← Back to My Tickets
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
            <span className="ticket-detail-id">{ticket.ticketId}</span>

            <h1>{ticket.title}</h1>

            <p>View the details and current status of this support request.</p>
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

                <strong>{new Date(ticket.createdAt).toLocaleString()}</strong>
              </div>

              <div className="detail-item">
                <span>Change Status</span>

                <select
                  className="status-select"
                  value={ticket.status}
                  disabled={updatingStatus}
                  onChange={(event) =>
                    handleStatusChange(event.target.value as TicketStatus)
                  }
                >
                  <option value="OPEN">Open</option>

                  <option value="IN_PROGRESS">In Progress</option>

                  <option value="RESOLVED">Resolved</option>
                </select>
              </div>
            </div>

            {statusMessage && (
              <p className="status-update-message">{statusMessage}</p>
            )}
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
