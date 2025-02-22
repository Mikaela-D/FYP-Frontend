// C:\Users\Mikaela\FYP-Frontend\components\meetups\NewMeetupForm.js

import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {
  const IdInputRef = useRef();
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const categoryInputRef = useRef();
  const descriptionInputRef = useRef();
  const quantityInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredId = IdInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredQuantity = quantityInputRef.current.value;

    const meetupData = {
      meetingId: enteredId,
      title: enteredTitle,
      image: enteredImage,
      price: enteredPrice,
      category: enteredCategory,
      description: enteredDescription,
      quantity: enteredQuantity,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="Id">Ticket Id (must be unique)</label>
          <input type="number" required id="Id" ref={IdInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" required ref={categoryInputRef}>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Furniture">Furniture</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="quantity">Status</label>
          <input type="number" required id="quantity" ref={quantityInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Priority</label>
          <input type="number" required id="price" ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Relevant Images (if any)</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Create Ticket</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
