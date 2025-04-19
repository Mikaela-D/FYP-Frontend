// C:\Users\Mikaela\FYP-Frontend\components\tickets\EditTicketForm.js

import { useRef, useState, useEffect } from "react";
import classes from "./EditTicketForm.module.css";
import ConfirmationModal from "../ui/ConfirmationModal";

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

  const [isDirty, setIsDirty] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  function handleInputChange() {
    setIsDirty(true);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const updatedTicketData = {
      _id: props.ticketData._id || "", // Ensure `_id` exists
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

    if (!updatedTicketData._id) {
      alert("Error: Ticket ID (_id) is missing!");
      return;
    }

    console.log("Sending update request:", updatedTicketData);

    try {
      const response = await fetch("/api/update-ticket", {
        method: "PUT", // Use PUT method for updates
        body: JSON.stringify(updatedTicketData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.response === "success") {
        // Call the onUpdate function to update the ticket details
        props.onUpdate(updatedTicketData);
        setIsDirty(false);
      } else {
        alert("Failed to update ticket: " + data.error);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("An error occurred while updating the ticket.");
    }
  }

  function cancelHandler() {
    if (isDirty) {
      setShowModal(true);
    } else {
      props.onClose();
    }
  }

  function confirmCancelHandler() {
    setShowModal(false);
    props.onClose();
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <ConfirmationModal
          message="You have unsaved changes. Are you sure you want to close the popup?"
          onConfirm={confirmCancelHandler}
          onCancel={closeModalHandler}
        />
      )}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            required
            id="title"
            defaultValue={props.ticketData.title}
            ref={titleInputRef}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            required
            defaultValue={props.ticketData.category}
            ref={categoryInputRef}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Relevant Images (if any)</label>
          <input
            type="url"
            id="image"
            defaultValue={props.ticketData.image}
            ref={imageInputRef}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTicketForm;
