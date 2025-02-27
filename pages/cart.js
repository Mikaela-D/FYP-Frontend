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

      <ul className={classes.ticketList}>
        {cart.map((ticket) => (
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
