// C:\Users\Mikaela\FYP-Frontend\components\meetups\MeetupItem.js

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "../generic/CartContext";

function MeetupItem(props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  function addToCartHandler() {
    if (props.quantity <= 0) {
      alert("Sorry, this item is out of stock.");
      return;
    }
    if (selectedQuantity > props.quantity) {
      alert(`Only ${props.quantity} items are available.`);
      return;
    }

    addToCart({
      id: props.id,
      customerName: props.customerName,
      customerPhone: props.customerPhone,
      customerEmail: props.customerEmail,
      image: props.image,
      title: props.title,
      price: props.price,
      category: props.category,
      quantity: selectedQuantity,
    });
    router.push("/cart");
  }

  function quantityChangeHandler(event) {
    setSelectedQuantity(Number(event.target.value));
  }

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item} style={{ display: "inline-block", verticalAlign: "top", margin: "10px" }}>
      <Card>
        <header className={classes.header}>
          <div className={classes.headerBar}></div>
          <h3>{props.title}</h3>
        </header>

        <div className={classes.body}>
          <div className={classes.infoGrid}>
            <div><strong>Category:</strong> {props.category}</div>
            <div><strong>Price:</strong> €{props.price}</div>
            <div><strong>Priority:</strong> 
              <span className={`${classes.badge} ${classes[`priority-${props.priority?.toLowerCase()}`]}`}>
                {props.priority}
              </span>
            </div>
            <div><strong>Status:</strong> 
              <span className={`${classes.badge} ${classes[`status-${props.status?.toLowerCase()}`]}`}>
                {props.status}
              </span>
            </div>
            <div><strong>Stock:</strong> 
              {props.quantity > 0 ? `${props.quantity} items left` : "Out of stock"}
            </div>
          </div>
        </div>

        <footer className={classes.footer}>
          <div className={classes.actions}>
            <label htmlFor={`quantity_${props.id}`}>Quantity:</label>
            <select
              id={`quantity_${props.id}`}
              value={selectedQuantity}
              onChange={quantityChangeHandler}
              disabled={props.quantity <= 0}
            >
              {Array.from({ length: props.quantity }, (_, i) => i + 1).map((qty) => (
                <option key={qty} value={qty}>{qty}</option>
              ))}
            </select>

            <button onClick={showDetailsHandler}>Details</button>
            <button onClick={addToCartHandler} disabled={props.quantity <= 0}>
              Add to Cart
            </button>
          </div>
        </footer>
      </Card>
    </li>
  );
}

export default MeetupItem;
