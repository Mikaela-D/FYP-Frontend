// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketItem.js

import Card from "../ui/Card";
import classes from "./TicketItem.module.css";
import { useRouter } from "next/router";
import { useAgentTickets } from "../generic/AgentTicketsContext";

function TicketItem(props) {
  const { agentTickets, addToAgentTickets } = useAgentTickets();
  const router = useRouter();

  function addToAgentTicketsHandler() {
    if (agentTickets.some((ticket) => ticket.id === props.id)) {
      alert("This ticket is already assigned to you.");
      return;
    }

    addToAgentTickets({
      id: props.id,
      customerName: props.customerName,
      customerPhone: props.customerPhone,
      customerEmail: props.customerEmail,
      image: props.image,
      title: props.title,
      category: props.category,
      priority: props.priority,
      status: props.status,
      description: props.description,
    });
    router.push("/agent-tickets");
  }

  function showDetailsHandler() {
    router.push("/" + props.id);
  }

  return (
    <li
      className={classes.item}
      style={{ display: "inline-block", verticalAlign: "top", margin: "10px" }}
    >
      <Card>
        <header className={classes.header}>
          <div className={classes.headerBar}></div>
          <h3>{props.title}</h3>
        </header>

        <div className={classes.body}>
          <div className={classes.infoGrid}>
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
          </div>
        </div>

        <footer className={classes.footer}>
          <div className={classes.actions}>
            <button onClick={showDetailsHandler}>Details</button>
            <button onClick={addToAgentTicketsHandler}>Assign to Me</button>
          </div>
        </footer>
      </Card>
    </li>
  );
}

export default TicketItem;
