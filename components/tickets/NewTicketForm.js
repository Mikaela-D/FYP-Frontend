// C:\Users\Mikaela\FYP-Frontend\components\tickets\NewTicketForm.js

import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "./NewTicketForm.module.css";

function NewTicketForm(props) {
  const IdInputRef = useRef();
  const titleInputRef = useRef();
  const customerNameInputRef = useRef();
  const categoryInputRef = useRef();
  const priorityInputRef = useRef();
  const statusInputRef = useRef();
  const descriptionInputRef = useRef();
  const imageInputRef = useRef();

  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  function handleCustomerChange(event) {
    const selectedCustomer = props.customers.find(
      (customer) => customer.customerName === event.target.value
    );
    setIsCustomerSelected(event.target.value !== "");
    setSelectedCustomerId(selectedCustomer ? selectedCustomer._id : "");
  }

  function submitHandler(event) {
    event.preventDefault();

    if (!selectedCustomerId) {
      alert("Please select a valid customer.");
      return;
    }

    const enteredId = IdInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredPriority = priorityInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredImage = imageInputRef.current.value;

    const ticketData = {
      ticketId: enteredId,
      title: enteredTitle,
      customerId: selectedCustomerId,
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
          <label htmlFor="existingCustomer">Existing Customer</label>
          <select
            id="existingCustomer"
            ref={customerNameInputRef}
            onChange={handleCustomerChange}
          >
            <option value="">Select Customer</option>
            {props.customers.map((customer) => (
              <option key={customer._id} value={customer.customerName}>
                {customer.customerName}
              </option>
            ))}
          </select>
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
