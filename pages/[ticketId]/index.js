// C:\Users\Mikaela\FYP-Frontend\pages\[ticketId]\index.js

import TicketDetail from "../../components/meetups/TicketDetail";
import { useRouter } from "next/router";
import GlobalContext from "../store/globalContext";
import { useContext } from "react";

export default function TicketPage() {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  let returnVal = null;
  for (let ii = 0; ii < globalCtx.theGlobalObject.tickets.length; ii++) {
    let temp = globalCtx.theGlobalObject.tickets[ii];
    if (temp.ticketId && router.query.ticketId && temp.ticketId.trim() === router.query.ticketId.trim()) {
      returnVal = (
        <TicketDetail
          image={temp.image}
          title={temp.title}
          customerName={temp.customerName || "N/A"}
          customerPhone={temp.customerPhone || "N/A"}
          customerEmail={temp.customerEmail || "N/A"}
          category={temp.category}
          priority={temp.priority}
          status={temp.status}
          description={temp.description}
        />
      );
    }
  }
  return returnVal;
}
