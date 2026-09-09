import {
  authenticatedFetch,
} from "./apiClient";

import type {
  Ticket,
  TicketStatus,
} from "../types/ticket";


import type { TicketsResponse } from "../types/api";

const API_URL =
  "https://mri72vwawe.execute-api.ap-southeast-2.amazonaws.com";

export interface CreateTicketInput {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await authenticatedFetch(`${API_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to retrieve tickets.");
  }

  const data: TicketsResponse = await response.json();

  return data.tickets;
}

export async function getTicket(
  ticketId: string
): Promise<Ticket> {
  const response = await authenticatedFetch(
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
  const response = await authenticatedFetch(`${API_URL}/tickets`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || "Failed to create ticket."
    );
  }

  const data: { ticket: Ticket } =
    await response.json();

  return data.ticket;
}

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
): Promise<Ticket> {
  const response = await authenticatedFetch(
    `${API_URL}/tickets/${ticketId}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
        "Failed to update ticket status."
    );
  }

  const data: { ticket: Ticket } =
    await response.json();

  return data.ticket;
}