export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED";

export type TicketPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdBy: string;
  createdAt: string;
}