// C:\Users\Mikaela\FYP-Frontend\pages\[ticketId]\index.js

import TicketDetail from "../../components/tickets/TicketDetail";
import { useRouter } from "next/router";
import GlobalContext from "../store/globalContext";
import { useContext, useEffect, useState } from "react";

export default function TicketPage() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      const response = await fetch("/api/agents");
      const data = await response.json();
      setAgents(data);
    }
    fetchAgents();
  }, []);

  let returnVal = null;
  for (let ii = 0; ii < globalCtx.theGlobalObject.tickets.length; ii++) {
    let temp = globalCtx.theGlobalObject.tickets[ii];
    if (
      temp.customerId &&
      typeof temp.customerId.customerId === "string" &&
      router.query.ticketId &&
      temp.customerId.customerId.trim() === router.query.ticketId.trim()
    ) {
      const assignedAgent =
        agents.find((a) => a._id === temp.assignedTo)?.name || "Unassigned";
      returnVal = (
        <TicketDetail
          _id={temp._id}
          image={temp.image}
          title={temp.title}
          customerName={temp.customerName || "N/A"}
          customerPhone={temp.customerPhone || "N/A"}
          customerEmail={temp.customerEmail || "N/A"}
          category={temp.category}
          priority={temp.priority}
          status={temp.status}
          description={temp.description}
          assignedTo={assignedAgent}
        />
      );
    }
  }
  return (
    returnVal || (
      <p>Ticket not found or you do not have access to view this ticket.</p>
    )
  );
}
