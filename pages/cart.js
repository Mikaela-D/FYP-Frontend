// C:\Users\Mikaela\FYP-Frontend\pages\cart.js

import { useCart } from "../components/generic/CartContext";
import { useState } from "react";
import classes from "../styles/Cart.module.css";

export default function Cart() {
  const { cart, setCart } = useCart();
  const [purchasedItems, setPurchasedItems] = useState([]);

  const handleBuy = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);

    setPurchasedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className={classes.cart}>
      <h1>New Interaction</h1>
      <p>I could add a record of the calls etc here maybe, plus the call controls.</p>
      
      {purchasedItems.length > 0 && (
        <div className={classes.purchasedMessage}>
          <h2>Purchased Items</h2>
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>
                <span>
                  {item.title} - {item.price}€ x {item.quantity} ={" "}
                  {item.price * item.quantity}€
                </span>{" "}
                <em>(Purchased)</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
