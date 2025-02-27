// C:\Users\Mikaela\FYP-Frontend\components\generic\CartContext.js

import { createContext, useState, useContext } from "react";

// CartContext still exists, but now holds work tickets (interactions)
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // This is now the agent's work queue

  function addToCart(ticket) { // Ticket = a work ticket (support request)
    setCart((prevCart) => [...prevCart, ticket]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Still called useCart (for compatibility), but means "use work queue"
export function useCart() {
  return useContext(CartContext);
}
