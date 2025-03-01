// C:\Users\Mikaela\FYP-Frontend\pages\[meetupId]\index.js

import TicketDetail from "../../components/meetups/TicketDetail";
import { useRouter } from "next/router";
import GlobalContext from "../../pages/store/globalContext";
import { useContext } from "react";

export default function () {
  const globalCtx = useContext(GlobalContext);
  const router = useRouter();

  // Back to basics, a simple for loop. Also trim() comes into play as it usually does!
  let returnVal = null;
  for (let ii = 0; ii < globalCtx.theGlobalObject.meetings.length; ii++) {
    let temp = globalCtx.theGlobalObject.meetings[ii];
    if (temp.meetingId && router.query.meetupId && temp.meetingId.trim() === router.query.meetupId.trim()) {
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
  // In the real world, we'd put the code above in the store context module.
  return returnVal;
}
