import { createContext, useState, useContext } from "react";

// Create the Cart Context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use the Cart Context
export function useCart() {
  return useContext(CartContext);
}
