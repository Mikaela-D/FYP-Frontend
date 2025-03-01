import { useAgentTickets } from "../components/generic/CartContext";
import { useEffect, useState } from "react";
import classes from "../styles/Cart.module.css";

export default function AgentTickets() {
  const { agentTickets, removeFromAgentTickets, isHydrated } = useAgentTickets();

  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const saved = localStorage.getItem("resolvedTickets");
    if (saved) {
      setResolvedTickets(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resolvedTickets", JSON.stringify(resolvedTickets));
  }, [resolvedTickets]);

  const handleResolve = (ticket) => {
    removeFromAgentTickets(ticket.id);
    setResolvedTickets((prev) => [...prev, {
      ...ticket,
      resolvedBy: "Me",
      resolvedAt: new Date().toISOString(),
    }]);
  };

  const filteredTickets = agentTickets.filter((ticket) => {
    return (
      (priorityFilter === "all" || ticket.priority === priorityFilter) &&
      (categoryFilter === "all" || ticket.category === categoryFilter) &&
      (statusFilter === "all" || ticket.status === statusFilter)
    );
  });

  if (!isHydrated) {
    return <p className={classes.loading}>Loading your work queue...</p>;
  }

  return (
    <div className={classes.cart}>
      <h1>Agent Work Queue</h1>

      {/* Filter Bar */}
      <div className={classes.filterBar}>
        <label>
          Filter by Priority:
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          Filter by Category:
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="Technical">Techical</option>
            <option value="Billing">Billing</option>
            <option value="Account">Account</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Filter by Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Response">Awaiting Response</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
      </div>

      {/* No Tickets Message (if no tickets at all) */}
      {agentTickets.length === 0 && priorityFilter === "all" && categoryFilter === "all" && statusFilter === "all" && (
        <p className={classes.noTickets}>No tickets are currently assigned to you.</p>
      )}

      {/* Ticket List */}
      {filteredTickets.length === 0 && agentTickets.length > 0 ? (
        <p className={classes.noTickets}>No tickets found matching your filters.</p>
      ) : (
        <ul className={classes.ticketList}>
          {filteredTickets.map((ticket) => (
            <li key={ticket.id} className={classes.cartItem}>
              <header className={classes.cartItemHeader}>
                <div className={classes.headerBar}></div>
                <h3>{ticket.title}</h3>
              </header>

              <div className={classes.cartItemBody}>
                <div className={classes.infoGrid}>
                  <div><strong>Customer:</strong> {ticket.customerName}</div>
                  <div><strong>Category:</strong> {ticket.category}</div>
                  <div><strong>Priority:</strong> 
                    <span className={`${classes.badge} ${classes[`priority-${ticket.priority?.toLowerCase()}`]}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div><strong>Status:</strong> 
                    <span className={`${classes.badge} ${classes[`status-${ticket.status?.toLowerCase()}`]}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div><strong>Assigned To:</strong> {ticket.assignedTo || "Unassigned"}</div>
                </div>
              </div>

              <footer className={classes.cartItemFooter}>
                <button className={classes.resolveButton} onClick={() => handleResolve(ticket)}>
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
                  {ticket.title} - Resolved by {ticket.resolvedBy} on {new Date(ticket.resolvedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
