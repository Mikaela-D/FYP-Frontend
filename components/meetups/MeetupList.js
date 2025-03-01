// C:\Users\Mikaela\FYP-Frontend\components\meetups\MeetupList.js

import TicketItem from "./TicketItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <TicketItem
          key={meetup._id}
          id={meetup.ticketId}
          title={meetup.title}
          customerName={meetup.customerName}
          customerPhone={meetup.customerPhone}
          customerEmail={meetup.customerEmail}
          category={meetup.category}
          priority={meetup.priority}
          status={meetup.status}
          description={meetup.description}
          image={meetup.image}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
