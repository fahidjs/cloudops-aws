import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import TicketTable from "../components/TicketTable";
import { mockTickets } from "../data/mockTickets";

function DashboardPage() {
  const openTickets = mockTickets.filter(
    (ticket) => ticket.status === "OPEN"
  ).length;

  const inProgressTickets = mockTickets.filter(
    (ticket) => ticket.status === "IN_PROGRESS"
  ).length;

  const resolvedTickets = mockTickets.filter(
    (ticket) => ticket.status === "RESOLVED"
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

      <TicketTable tickets={mockTickets} />
    </main>
  );
}

export default DashboardPage;