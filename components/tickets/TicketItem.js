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
  const [routerReady, setRouterReady] = useState(false);

  // Fetch agents from the database
  useEffect(() => {
    async function fetchAgents() {
      const response = await fetch("/api/agents");
      const data = await response.json();
      setAgents(data);
    }
    fetchAgents();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
    }
  }, [router.isReady]);

  // Handle assigning the ticket to an agent
  async function assignAgentHandler(agentId) {
    if (!agentId) {
      alert("Invalid agent selected.");
      return;
    }

    if (!props.id || props.id.length !== 24) {
      // Validate `_id`, not `ticketId`
      alert("Invalid ticket ID format.");
      console.error("Invalid ticket ID:", props.id);
      return;
    }

    console.log("Assigning agent:", agentId, "to ticket:", props.id);

    try {
      const response = await fetch(`/api/assign-agent`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: props.id, // Correct: Sending `_id` instead of `ticketId`
          agentId: agentId,
        }),
      });

      if (!response.ok) {
        alert("Failed to assign agent");
        return;
      }

      const data = await response.json();
      console.log("Response from server:", data);

      setAssignedTo(agentId); // Update UI

      // Check if the selected agent is the currently logged-in agent
      const loggedInAgentId = localStorage.getItem("agentId");
      if (agentId === loggedInAgentId) {
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
          assignedTo: "Me", // Display "Me" in agent-tickets page
        });
      }
    } catch (error) {
      console.error("Error assigning agent:", error);
    }
  }

  // "Assign to me" handler (for agents themselves)
  async function addToAgentTicketsHandler() {
    // Use the logged-in agent's name from localStorage
    const agentName = localStorage.getItem("agentName"); // Get agent name from localStorage

    if (!agentName) {
      alert("Could not find your agent profile (missing agent name).");
      return;
    }

    try {
      // 1. Fetch agent's agent ID
      const agentResponse = await fetch(
        `/api/agent-by-name?name=${encodeURIComponent(agentName)}`
      );
      if (!agentResponse.ok) {
        alert("Could not find your agent profile.");
        return;
      }
      const agent = await agentResponse.json();
      const agentId = agent._id;

      // 2. Assign agent to the ticket
      const assignResponse = await fetch(`/api/assign-agent`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId: props.id, agentId }),
      });

      if (!assignResponse.ok) {
        alert("Failed to assign ticket to you.");
        return;
      }

      // 3. Add to local context (AgentTicketsContext) for immediate UI feedback
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
        assignedTo: "Me", // Display "Me" in agent-tickets page
      });

      router.push("/agent-tickets");
    } catch (error) {
      console.error("Error assigning ticket to agent:", error);
      alert("Something went wrong. Check console for details.");
    }
  }

  // Show ticket details
  function showDetailsHandler() {
    if (props.customerId && typeof props.customerId.customerId === "string") {
      const customerId = props.customerId.customerId; // Extract customerId from the object
      if (routerReady) {
        router.push("/" + customerId);
      } else {
        console.error("Router is not ready:", JSON.stringify(props));
      }
    } else {
      console.error("Invalid customerId:", JSON.stringify(props));
    }
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
