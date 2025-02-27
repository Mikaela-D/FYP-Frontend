// C:\Users\Mikaela\FYP-Frontend\pages\cart.js

import { useCart } from "../components/generic/CartContext";
import { useState } from "react";
import classes from "../styles/Cart.module.css";

export default function Cart() {
  const { cart, setCart } = useCart(); // Cart = work queue now
  const [resolvedTickets, setResolvedTickets] = useState([]);

  const handleResolve = (ticket) => {
    const updatedCart = cart.filter((t) => t.id !== ticket.id);
    setCart(updatedCart);

    setResolvedTickets((prev) => [...prev, ticket]);
  };

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
                <span>{ticket.title} - <em>(Resolved)</em></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
