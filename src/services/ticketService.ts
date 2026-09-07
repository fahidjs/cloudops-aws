import type { TicketsResponse } from "../types/api";
import type { Ticket } from "../types/ticket";

export interface CreateTicketInput {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdBy: string;
}

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

export async function createTicket(
  ticket: CreateTicketInput
): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket.");
  }

  const data: { ticket: Ticket } =
    await response.json();

  return data.ticket;
}