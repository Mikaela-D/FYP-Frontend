// C:\Users\Mikaela\FYP-Frontend\pages\agent-tickets.js

import { useAgentTickets } from "../components/generic/AgentTicketsContext";
import { useEffect, useState } from "react";
import classes from "../styles/agent-tickets.module.css";
import { useRouter } from "next/router";

export default function AgentTickets() {
  const { agentTickets, setAgentTickets, removeFromAgentTickets, isHydrated } =
    useAgentTickets();
  const router = useRouter();

  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchAssignedTickets() {
      let loggedInAgentId = localStorage.getItem("agentId");
      if (!loggedInAgentId) {
        console.error(
          "Agent ID is missing in localStorage. Redirecting to login."
        );
        localStorage.removeItem("isLoggedIn"); // Clear login flag
        router.push("/login"); // Redirect to login page
        return;
      }

      const response = await fetch(
        `/api/tickets-by-agent?agentId=${loggedInAgentId}`
      );
      const text = await response.text(); // Read response as text for debugging
      console.log("Response text:", text); // Debugging line

      let data;
      try {
        data = JSON.parse(text); // Attempt to parse JSON
      } catch (err) {
        console.error("Failed to parse response as JSON:", err);
        console.error("Response text:", text); // Log raw response for debugging
        return;
      }

      if (response.ok) {
        setAgentTickets(
          data.tickets.map((ticket) => ({
            id: ticket._id,
            customerName: ticket.customerName,
            customerPhone: ticket.customerPhone,
            customerEmail: ticket.customerEmail,
            image: ticket.image,
            title: ticket.title,
            category: ticket.category,
            priority: ticket.priority,
            status: ticket.status,
            description: ticket.description,
            assignedTo: "Me",
          }))
        );
      } else {
        console.error("Failed to load assigned tickets:", data.error);
      }
    }

    fetchAssignedTickets();

    const saved = localStorage.getItem("resolvedTickets");
    if (saved) {
      setResolvedTickets(JSON.parse(saved));
    }
  }, [setAgentTickets, router]);

  useEffect(() => {
    localStorage.setItem("resolvedTickets", JSON.stringify(resolvedTickets));
  }, [resolvedTickets]);

  const handleResolve = (ticket) => {
    removeFromAgentTickets(ticket.id);
    setResolvedTickets((prev) => [
      ...prev,
      {
        ...ticket,
        resolvedBy: "Me",
        resolvedAt: new Date().toISOString(),
      },
    ]);
  };

  const filteredTickets = agentTickets.filter((ticket) => {
    return (
      (priorityFilter === "all" || ticket.priority === priorityFilter) &&
      (categoryFilter === "all" || ticket.category === categoryFilter) &&
      (statusFilter === "all" || ticket.status === statusFilter)
    );
  });

  if (!isHydrated) {
    return <p className={classes.loading}>Loading your tickets...</p>;
  }

  return (
    <div className={classes.agentTickets}>
      <h1>Agent's Assigned Tickets</h1>

      {/* Filter Bar */}
      <div className={classes.filterBar}>
        <label>
          Filter by Priority:
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Filter by Category:
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Account">Account</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Filter by Status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Response">Awaiting Response</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
      </div>

      {filteredTickets.length === 0 ? (
        <p className={classes.noTickets}>
          No tickets found matching your filters.
        </p>
      ) : (
        <ul className={classes.ticketList}>
          {filteredTickets.map((ticket) => (
            <li key={ticket.id} className={classes.agentTicketsItem}>
              <header className={classes.agentTicketsItemHeader}>
                <div className={classes.headerBar}></div>
                <h3>{ticket.title}</h3>
              </header>

              <div className={classes.agentTicketsItemBody}>
                <div className={classes.infoGrid}>
                  <div>
                    <strong>Customer:</strong> {ticket.customerName}
                  </div>
                  <div>
                    <strong>Category:</strong> {ticket.category}
                  </div>
                  <div>
                    <strong>Priority:</strong>
                    <span
                      className={`${classes.badge} ${
                        classes[`priority-${ticket.priority?.toLowerCase()}`]
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <span
                      className={`${classes.badge} ${
                        classes[`status-${ticket.status?.toLowerCase()}`]
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <div>
                    <strong>Assigned To:</strong>{" "}
                    {ticket.assignedTo || "Unassigned"}
                  </div>
                </div>
              </div>

              <footer className={classes.agentTicketsItemFooter}>
                <button
                  className={classes.resolveButton}
                  onClick={() => handleResolve(ticket)}
                >
                  Resolve Ticket
                </button>
              </footer>
            </li>
          ))}
        </ul>
      )}

      {/* Resolved Tickets Section */}
      {resolvedTickets.length > 0 && (
        <div className={classes.purchasedMessage}>
          <h2>Resolved Tickets</h2>
          <ul>
            {resolvedTickets.map((ticket, index) => (
              <li key={index}>
                <span>
                  {ticket.title} - Resolved by {ticket.resolvedBy} on{" "}
                  {new Date(ticket.resolvedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
