import { useRef } from "react";
import classes from "./EditTicketForm.module.css";

function EditTicketForm(props) {
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

    const updatedTicketData = {
      title: titleInputRef.current.value,
      customerName: customerNameInputRef.current.value,
      customerPhone: customerPhoneInputRef.current.value,
      customerEmail: customerEmailInputRef.current.value,
      category: categoryInputRef.current.value,
      priority: priorityInputRef.current.value,
      status: statusInputRef.current.value,
      description: descriptionInputRef.current.value,
      image: imageInputRef.current.value,
    };

    // Call the onClose function to close the popup
    props.onClose();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          required
          id="title"
          defaultValue={props.ticketData.title}
          ref={titleInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          required
          id="customerName"
          defaultValue={props.ticketData.customerName}
          ref={customerNameInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="customerPhone">Customer Phone</label>
        <input
          type="tel"
          required
          id="customerPhone"
          defaultValue={props.ticketData.customerPhone}
          ref={customerPhoneInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="customerEmail">Customer Email</label>
        <input
          type="email"
          required
          id="customerEmail"
          defaultValue={props.ticketData.customerEmail}
          ref={customerEmailInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          required
          defaultValue={props.ticketData.category}
          ref={categoryInputRef}
        >
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="Account">Account</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          required
          defaultValue={props.ticketData.priority}
          ref={priorityInputRef}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          required
          defaultValue={props.ticketData.status}
          ref={statusInputRef}
        >
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
          defaultValue={props.ticketData.description}
          ref={descriptionInputRef}
        ></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="image">Relevant Images (if any)</label>
        <input
          type="url"
          id="image"
          defaultValue={props.ticketData.image}
          ref={imageInputRef}
        />
      </div>
      <div className={classes.actions}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTicketForm;
