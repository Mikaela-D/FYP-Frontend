// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketDetail.js

import classes from "./TicketDetail.module.css";

function TicketDetail(props) {
  return (
    <section className={classes.ticket}>
      <header className={classes["ticket-header"]}>
        <div className={classes["header-bar"]}></div>
        <h1>{props.title}</h1>
      </header>

      <div className={classes["ticket-body"]}>
        <div className={classes["ticket-info-grid"]}>
          <div><strong>Customer Name:</strong> {props.customerName}</div>
          <div><strong>Phone:</strong> {props.customerPhone}</div>
          <div><strong>Email:</strong> {props.customerEmail}</div>
          <div><strong>Category:</strong> {props.category}</div>
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
        <p><strong>Generated on:</strong> {new Date().toLocaleDateString()}</p>
      </footer>
    </section>
  );
}

export default TicketDetail;
