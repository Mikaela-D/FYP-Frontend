// C:\Users\Mikaela\FYP-Frontend\components\tickets\TicketItem.js

import Card from "../ui/Card";
import classes from "./TicketItem.module.css";
import { useRouter } from "next/router";
import { useAgentTickets } from "../generic/AgentTicketsContext";
import { useEffect, useState } from "react";

function TicketItem(props) {
  const { agentTickets, addToAgentTickets } = useAgentTickets();
  const router = useRouter();

  const [agents, setAgents] = useState([]);
  const [assignedTo, setAssignedTo] = useState(props.assignedTo || "");

  // Fetch agents from the database
  useEffect(() => {
    async function fetchAgents() {
      const response = await fetch("/api/agents");
      const data = await response.json();
      setAgents(data);
    }
    fetchAgents();
  }, []);

  // Handle assigning the ticket to an agent
  async function assignAgentHandler(agentId) {
    console.log("Assigning agent:", agentId, "to ticket:", props.id);
    setAssignedTo(agentId);

    try {
      const response = await fetch(`/api/assign-agent`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: props.id, agentId }),
      });
      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);
      if (!response.ok) {
        alert("Failed to assign agent");
      } else {
        const data = JSON.parse(responseText);
        console.log("Response from server:", data);
      }
    } catch (error) {
      console.error("Error assigning agent:", error);
    }
  }

  // "Assign to me" handler (for agents themselves)
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

  // Show ticket details
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
            <div>
              <strong>Assigned To:</strong>{" "}
              {agents.find((a) => a._id === assignedTo)?.name || "Unassigned"}
            </div>
          </div>
        </div>

        <footer className={classes.footer}>
          <div className={classes.actions}>
            <button onClick={showDetailsHandler}>Details</button>
            <button onClick={addToAgentTicketsHandler}>Assign to Me</button>

            <select
              value={assignedTo}
              onChange={(e) => assignAgentHandler(e.target.value)}
              className={classes.assignDropdown}
            >
              <option value="">Assign to...</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </footer>
      </Card>
    </li>
  );
}

export default TicketItem;
