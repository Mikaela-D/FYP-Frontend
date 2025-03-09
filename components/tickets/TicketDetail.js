// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketDetail.js

import { useState, useRef, useEffect } from "react";
import classes from "./TicketDetail.module.css";
import EditTicketForm from "./EditTicketForm";
import ConfirmationModal from "../ui/ConfirmationModal";

function TicketDetail(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [ticketData, setTicketData] = useState(props);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const popupRef = useRef();

  function startEditHandler() {
    setIsEditing(true);
  }

  function stopEditHandler() {
    setIsEditing(false);
  }

  function handleClickOutside(event) {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      stopEditHandler();
    }
  }

  useEffect(() => {
    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  function updateTicketData(updatedData) {
    setTicketData(updatedData);
    stopEditHandler();
  }

  function confirmDeleteHandler() {
    setShowDeleteModal(true);
  }

  function cancelDeleteHandler() {
    setShowDeleteModal(false);
  }

  async function resolveTicketHandler() {
    const response = await fetch("/api/delete-ticket", {
      method: "POST",
      body: JSON.stringify({ _id: ticketData._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.response === "success") {
      alert("Ticket resolved successfully!");
      // Redirect or update UI as needed
    } else {
      alert("Failed to resolve ticket: " + data.error);
    }
    setShowDeleteModal(false);
  }

  return (
    <section className={classes.ticket}>
      <header className={classes["ticket-header"]}>
        <div className={classes["header-bar"]}></div>
        <h1>{ticketData.title}</h1>
      </header>

      <div className={classes["ticket-body"]}>
        <div className={classes["ticket-info-grid"]}>
          <div>
            <strong>Customer Name:</strong> {ticketData.customerName}
          </div>
          <div>
            <strong>Phone:</strong> {ticketData.customerPhone}
          </div>
          <div>
            <strong>Email:</strong> {ticketData.customerEmail}
          </div>
          <div>
            <strong>Category:</strong> {ticketData.category}
          </div>
          <div>
            <strong>Priority:</strong>
            <span
              className={`${classes.badge} ${
                classes[`priority-${ticketData.priority?.toLowerCase()}`]
              }`}
            >
              {ticketData.priority}
            </span>
          </div>
          <div>
            <strong>Status:</strong>
            <span
              className={`${classes.badge} ${
                classes[`status-${ticketData.status?.toLowerCase()}`]
              }`}
            >
              {ticketData.status}
            </span>
          </div>
          <div>
            <strong>Assigned To:</strong> {ticketData.assignedTo}
          </div>
        </div>

        <div className={classes["ticket-description"]}>
          <h2>Description</h2>
          <p>{ticketData.description}</p>
        </div>

        {ticketData.image && (
          <div className={classes["ticket-image"]}>
            <img src={ticketData.image} alt={ticketData.title} />
          </div>
        )}
      </div>

      <footer className={classes["ticket-footer"]}>
        <p>
          <strong>Generated on:</strong> {new Date().toLocaleDateString()}
        </p>
        <button className={classes["edit-button"]} onClick={startEditHandler}>
          Edit Ticket
        </button>
        <button
          className={classes["resolve-button"]}
          onClick={confirmDeleteHandler}
        >
          Resolve Ticket
        </button>
      </footer>
      {isEditing && (
        <>
          <div className={classes.backdrop} onClick={stopEditHandler}></div>
          <div className={classes.popup} ref={popupRef}>
            <EditTicketForm
              ticketData={ticketData}
              onClose={stopEditHandler}
              onUpdate={updateTicketData}
            />
          </div>
        </>
      )}
      {showDeleteModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this ticket? This action is irreversible."
          onConfirm={resolveTicketHandler}
          onCancel={cancelDeleteHandler}
        />
      )}
    </section>
  );
}

export default TicketDetail;
