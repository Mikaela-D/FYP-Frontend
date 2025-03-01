// C:\Users\Mikaela\FYP-Frontend\components\tickets\NewTicketForm.js

import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewTicketForm.module.css";

function NewTicketForm(props) {
  const IdInputRef = useRef();
  const titleInputRef = useRef();
  const customerNameInputRef = useRef();
  const customerPhoneInputRef = useRef();
  const customerEmailInputRef = useRef();
  const categoryInputRef = useRef();
  const priorityInputRef = useRef();
  const statusInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredId = IdInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredCustomerName = customerNameInputRef.current.value;
    const enteredCustomerPhone = customerPhoneInputRef.current.value;
    const enteredCustomerEmail = customerEmailInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredPriority = priorityInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredImage = imageInputRef.current.value;

    const ticketData = {
      ticketId: enteredId,
      title: enteredTitle,
      customerName: enteredCustomerName,
      customerPhone: enteredCustomerPhone,
      customerEmail: enteredCustomerEmail,
      category: enteredCategory,
      priority: enteredPriority,
      status: enteredStatus,
      description: enteredDescription,
      image: enteredImage,
    };

    props.onAddTicket(ticketData);
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
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            required
            id="customerName"
            ref={customerNameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="customerPhone">Customer Phone</label>
          <input
            type="tel"
            required
            id="customerPhone"
            ref={customerPhoneInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="customerEmail">Customer Email</label>
          <input
            type="email"
            required
            id="customerEmail"
            ref={customerEmailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" required ref={categoryInputRef}>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Account">Account</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="priority">Priority</label>
          <select id="priority" required ref={priorityInputRef}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="status">Status</label>
          <select id="status" required ref={statusInputRef}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Response">Awaiting Response</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Issue Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Relevant Images (if any)</label>
          <input type="url" id="image" ref={imageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Create Ticket</button>
        </div>
      </form>
    </Card>
  );
}

export default NewTicketForm;
