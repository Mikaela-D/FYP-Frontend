// C:\Users\Mikaela\FYP-Frontend\components\generic\CartContext.js

import { createContext, useState, useContext, useEffect } from "react";

const AgentTicketsContext = createContext();

export function AgentTicketsProvider({ children }) {
  const [agentTickets, setAgentTickets] = useState([]);  // Starts empty for SSR safety
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("assignedTickets");
    if (saved) {
      setAgentTickets(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("assignedTickets", JSON.stringify(agentTickets));
    }
  }, [agentTickets, isHydrated]);

  function addToAgentTickets(ticket) {
    setAgentTickets((prevTickets) => {
      if (prevTickets.some((t) => t.id === ticket.id)) {
        alert("This ticket is already assigned to you.");
        return prevTickets;
      }
      return [...prevTickets, { ...ticket, assignedTo: "Me" }];
    });
  }

  function removeFromAgentTickets(ticketId) {
    setAgentTickets((prevTickets) => prevTickets.filter((t) => t.id !== ticketId));
  }

  return (
    <AgentTicketsContext.Provider value={{ agentTickets, setAgentTickets, addToAgentTickets, removeFromAgentTickets, isHydrated }}>
      {children}
    </AgentTicketsContext.Provider>
  );
}

export function useAgentTickets() {
  return useContext(AgentTicketsContext);
}
