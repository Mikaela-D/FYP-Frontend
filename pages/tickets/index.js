// C:\Users\Mikaela\FYP-Frontend\pages\tickets\index.js

import TicketList from "../../components/tickets/TicketList";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../store/globalContext";

function TicketsPage() {
  const globalCtx = useContext(GlobalContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (globalCtx.theGlobalObject.dataLoaded) {
      setTickets(globalCtx.theGlobalObject.tickets);
    }
  }, [globalCtx.theGlobalObject.dataLoaded, globalCtx.theGlobalObject.tickets]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Tickets</h1>
      {globalCtx.theGlobalObject.dataLoaded ? (
        <TicketList tickets={tickets} />
      ) : (
        <div>Loading data from database, please wait . . . </div>
      )}
    </>
  );
}

export default TicketsPage;
