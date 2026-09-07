import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";
import { getTickets } from "../services/ticketService";
import type { Ticket } from "../types/ticket";

function DashboardPage() {
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

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "OPEN",
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "IN_PROGRESS",
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "RESOLVED",
  ).length;

  return (
    <main className="dashboard">
      <Navbar />

      <section className="stats-grid">
        <StatCard
          title="Open Tickets"
          value={openTickets}
          description="Awaiting support"
        />

        <StatCard
          title="In Progress"
          value={inProgressTickets}
          description="Currently being investigated"
        />

        <StatCard
          title="Resolved"
          value={resolvedTickets}
          description="Successfully completed"
        />
      </section>

      {loading && <div className="api-message">Loading tickets...</div>}

      {error && <div className="api-message api-error">{error}</div>}

      {!loading && !error && <TicketTable tickets={tickets} />}
    </main>
  );
}

export default DashboardPage;
