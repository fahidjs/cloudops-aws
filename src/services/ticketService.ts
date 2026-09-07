import type { TicketsResponse } from "../types/api";
import type { Ticket } from "../types/ticket";

const API_URL =
  "https://mri72vwawe.execute-api.ap-southeast-2.amazonaws.com";

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to retrieve tickets.");
  }

  const data: TicketsResponse = await response.json();

  return data.tickets;
}

export async function getTicket(
  ticketId: string
): Promise<Ticket> {
  const response = await fetch(
    `${API_URL}/tickets/${ticketId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ticket not found.");
    }

    throw new Error("Failed to retrieve ticket.");
  }

  const data: { ticket: Ticket } =
    await response.json();

  return data.ticket;
}