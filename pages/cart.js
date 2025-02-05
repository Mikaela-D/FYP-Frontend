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
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className={classes.cartItem}>
              <img src={item.image} alt={item.title} />
              <div className={classes.itemDetails}>
                <h3>{item.title}</h3>
                <p>Price: {item.price}€</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: {item.price * item.quantity}€</p>
                <button
                  onClick={() => handleBuy(item)}
                  className={classes.buyButton}
                >
                  Buy
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

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
