import type { TicketsResponse } from "../types/api";

const API_URL = "https://mri72vwawe.execute-api.ap-southeast-2.amazonaws.com";

export async function getTickets() {
  const response = await fetch(`${API_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to retrieve tickets.");
  }

  const data: TicketsResponse = await response.json();

  return data.tickets;
}