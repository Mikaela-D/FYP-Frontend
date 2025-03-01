// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketList.js

import TicketItem from "./TicketItem";
import classes from "./TicketList.module.css";

function TicketList(props) {
  return (
    <ul className={classes.list}>
      {props.tickets.map((ticket) => (
        <TicketItem
          key={ticket._id}
          id={ticket.ticketId}
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
