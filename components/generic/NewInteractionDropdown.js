// C:\Users\Mikaela\FYP-Frontend\components\generic\NewInteractionDropdown.js

import Link from "next/link";
import classes from "./NewInteractionDropdown.module.css";

function NewInteractionDropdown() {
  return (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn}>New Interaction</button>
      <div className={classes.dropdownContent}>
        <Link href="/add-customer">Add Customer</Link>
        <Link href="/new-ticket">New Ticket</Link>
        <Link href="/new-call">New Call</Link>
      </div>
    </div>
  );
}

export default NewInteractionDropdown;
