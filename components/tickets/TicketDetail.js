// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketDetail.js

import { useState, useRef, useEffect } from "react";
import classes from "./TicketDetail.module.css";
import EditTicketForm from "./EditTicketForm";

function TicketDetail(props) {
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <section className={classes.ticket}>
      <header className={classes["ticket-header"]}>
        <div className={classes["header-bar"]}></div>
        <h1>{props.title}</h1>
      </header>

      <div className={classes["ticket-body"]}>
        <div className={classes["ticket-info-grid"]}>
          <div>
            <strong>Customer Name:</strong> {props.customerName}
          </div>
          <div>
            <strong>Phone:</strong> {props.customerPhone}
          </div>
          <div>
            <strong>Email:</strong> {props.customerEmail}
          </div>
          <div>
            <strong>Category:</strong> {props.category}
          </div>
          <div>
            <strong>Priority:</strong>
            <span
              className={`${classes.badge} ${
                classes[`priority-${props.priority?.toLowerCase()}`]
              }`}
            >
              {props.priority}
            </span>
          </div>
          <div>
            <strong>Status:</strong>
            <span
              className={`${classes.badge} ${
                classes[`status-${props.status?.toLowerCase()}`]
              }`}
            >
              {props.status}
            </span>
          </div>
          <div>
            <strong>Assigned To:</strong> {props.assignedTo}
          </div>
        </div>

        <div className={classes["ticket-description"]}>
          <h2>Description</h2>
          <p>{props.description}</p>
        </div>

        {props.image && (
          <div className={classes["ticket-image"]}>
            <img src={props.image} alt={props.title} />
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
      </footer>
      {isEditing && (
        <>
          <div className={classes.backdrop} onClick={stopEditHandler}></div>
          <div className={classes.popup} ref={popupRef}>
            <EditTicketForm ticketData={props} onClose={stopEditHandler} />
          </div>
        </>
      )}
    </section>
  );
}

export default TicketDetail;
