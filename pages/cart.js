// C:\Users\Mikaela\FYP-Frontend\pages\cart.js

import { useCart } from "../components/generic/CartContext";
import { useEffect, useState } from "react";
import classes from "../styles/Cart.module.css";

export default function Cart() {
  const { cart, removeFromCart, isHydrated } = useCart();

  const [resolvedTickets, setResolvedTickets] = useState([]);

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
    removeFromCart(ticket.id);
    setResolvedTickets((prev) => [...prev, {
      ...ticket,
      resolvedBy: "Me",
      resolvedAt: new Date().toISOString(),
    }]);
  };

  if (!isHydrated) {
    return <p className={classes.loading}>Loading your work queue...</p>;
  }

  return (
    <div className={classes.cart}>
      <h1>Agent Work Queue</h1>
      <p>Below are the work tickets assigned to you. Resolve them to log the interactions.</p>

      <ul className={classes.ticketList}>
        {cart.map((ticket) => (
          <li key={ticket.id} className={classes.cartItem}>
            <div className={classes.itemDetails}>
              <h3>{ticket.title}</h3>
              <p><strong>Customer:</strong> {ticket.customerName}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Category:</strong> {ticket.category}</p>
              <p><strong>Assigned To:</strong> {ticket.assignedTo}</p>
            </div>
            <button className={classes.resolveButton} onClick={() => handleResolve(ticket)}>
              Resolve Ticket
            </button>
          </li>
        ))}
      </ul>

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
