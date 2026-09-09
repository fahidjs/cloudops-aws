import { useState } from "react";
import { createTicket } from "../services/ticketService";

function CreateTicketPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !category || !description) {
      setMessage("Please complete all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      await createTicket({
        title,
        description,
        category,
        priority: priority as "LOW" | "MEDIUM" | "HIGH",
      });

      setMessage("Ticket created successfully.");

      setTitle("");
      setCategory("");
      setPriority("MEDIUM");
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to create ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="create-ticket-page">
      <div className="page-header">
        <h1>Create Ticket</h1>
        <p>Submit a new IT support request.</p>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Issue Title</label>

          <input
            id="title"
            type="text"
            placeholder="e.g. Outlook is not syncing"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Account">Account</option>
            <option value="Email">Email</option>
            <option value="Hardware">Hardware</option>
            <option value="Network">Network</option>
            <option value="Software">Software</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            placeholder="Describe the issue in detail..."
            rows={6}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        {message && <p className="form-message">{message}</p>}
        <button
          type="submit"
          className="submit-ticket-button"
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </main>
  );
}

export default CreateTicketPage;
