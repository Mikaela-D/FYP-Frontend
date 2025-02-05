import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "../generic/CartContext";

function MeetupItem(props) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedQuantity, setSelectedQuantity] = useState(1); // Track the user's selected quantity

  // Function to handle adding the product to the cart and navigating to the cart page
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
      image: props.image,
      title: props.title,
      price: props.price,
      category: props.category,
      quantity: selectedQuantity, // Add selected quantity to the cart item
    });
    router.push("/cart");
  }

  // Update the selected quantity when the user changes it
  function quantityChangeHandler(event) {
    setSelectedQuantity(Number(event.target.value));
  }

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>€{props.price}</p>
          <div>
            <p>Category: {props.category}</p>
          </div>
          <div>
            <p>
              <strong>
                {props.quantity > 0
                  ? `${props.quantity} items left`
                  : "Out of stock"}
              </strong>
            </p>
          </div>
        </div>
        <div className={classes.actions}>
          <div>
            <label htmlFor={`quantity_${props.id}`}>Select Quantity: </label>
            <select
              id={`quantity_${props.id}`}
              value={selectedQuantity}
              onChange={quantityChangeHandler}
              disabled={props.quantity <= 0}
            >
              {/* Generate options from 1 to available stock */}
              {Array.from({ length: props.quantity }, (_, i) => i + 1).map(
                (qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                )
              )}
            </select>
          </div>
          <button onClick={showDetailsHandler}>Show Details</button>
          <button onClick={addToCartHandler} disabled={props.quantity <= 0}>
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
