// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketList.js

import TicketItem from "./TicketItem";
import classes from "./TicketList.module.css";

function TicketList(props) {
  if (props.tickets.length === 0) {
    return (
      <p className={classes.noTickets}>No tickets are currently available.</p>
    );
  }

  return (
    <ul className={classes.list}>
      {props.tickets.map((ticket) => (
        <TicketItem
          key={ticket._id} // ✅ Correct: Use `_id` instead of `ticketId`
          id={ticket._id} // ✅ Correct: Pass `_id`, not `ticketId`
          title={ticket.title}
          customerName={ticket.customerName}
          customerPhone={ticket.customerPhone}
          customerEmail={ticket.customerEmail}
          category={ticket.category}
          priority={ticket.priority}
          status={ticket.status}
          description={ticket.description}
          image={ticket.image}
        />
      ))}
    </ul>
  );
}

export default TicketList;
