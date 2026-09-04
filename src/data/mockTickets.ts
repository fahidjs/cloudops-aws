import type { Ticket } from "../types/ticket";

export const mockTickets: Ticket[] = [
  {
    id: "CLO-1001",
    title: "Unable to connect to office Wi-Fi",
    description: "Laptop cannot connect to the corporate wireless network.",
    category: "Network",
    priority: "HIGH",
    status: "OPEN",
    createdBy: "john@example.com",
    createdAt: "2026-09-04T09:30:00",
  },
  {
    id: "CLO-1002",
    title: "Outlook mailbox not syncing",
    description: "New emails are not appearing in Outlook.",
    category: "Email",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    createdBy: "sarah@example.com",
    createdAt: "2026-09-04T08:45:00",
  },
  {
    id: "CLO-1003",
    title: "Password reset required",
    description: "User has forgotten their corporate password.",
    category: "Account",
    priority: "LOW",
    status: "RESOLVED",
    createdBy: "michael@example.com",
    createdAt: "2026-09-03T15:20:00",
  },
];