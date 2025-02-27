// C:\Users\Mikaela\FYP-Frontend\components\generic\CartContext.js

import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);  // Starts empty for SSR safety
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("assignedTickets");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("assignedTickets", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  function addToCart(ticket) {
    setCart((prevCart) => {
      if (prevCart.some((t) => t.id === ticket.id)) {
        alert("This ticket is already assigned to you.");
        return prevCart;
      }
      return [...prevCart, { ...ticket, assignedTo: "Me" }];
    });
  }

  function removeFromCart(ticketId) {
    setCart((prevCart) => prevCart.filter((t) => t.id !== ticketId));
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, isHydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
