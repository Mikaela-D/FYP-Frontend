// C:\Users\Mikaela\FYP-Frontend\components\clients\NewClientForm.js

import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./NewClientForm.module.css";

function NewClientForm(props) {
  const customerNameInputRef = useRef();
  const customerPhoneInputRef = useRef();
  const customerEmailInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredCustomerName = customerNameInputRef.current.value;
    const enteredCustomerPhone = customerPhoneInputRef.current.value;
    const enteredCustomerEmail = customerEmailInputRef.current.value;

    const clientData = {
      customerName: enteredCustomerName,
      customerPhone: enteredCustomerPhone,
      customerEmail: enteredCustomerEmail,
    };

    props.onAddClient(clientData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            required
            id="customerName"
            ref={customerNameInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="customerPhone">Customer Phone</label>
          <input
            type="tel"
            required
            id="customerPhone"
            ref={customerPhoneInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="customerEmail">Customer Email</label>
          <input
            type="email"
            required
            id="customerEmail"
            ref={customerEmailInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>Add Client</button>
        </div>
      </form>
    </Card>
  );
}

export default NewClientForm;
