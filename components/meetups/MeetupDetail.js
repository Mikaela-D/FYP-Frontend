// C:\Users\Mikaela\FYP-Frontend\components\meetups\MeetupDetail.js

import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <h1>{props.title}</h1>
      <p>Customer Phone: {props.customerPhone}</p>
      <p>Customer Email: {props.customerEmail}</p>
      <category>Category: {props.category}</category>
      <p>Priority: {props.priority}</p>
      <p>Status: {props.status}</p>
      <p>Description: {props.description}</p>
      <img src={props.image} alt={props.title} />
    </section>
  );
}

export default MeetupDetail;
