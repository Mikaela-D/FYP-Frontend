import classes from "./MeetupDetail.module.css";

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <price>Price: {props.price}€</price>
      <p>
        <category>Category: {props.category}</category>
      </p>
      <p>Description: {props.description}</p>
    </section>
  );
}

export default MeetupDetail;
