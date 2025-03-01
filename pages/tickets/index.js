import TicketList from "../../components/meetups/TicketList";
import { useContext } from "react";
import GlobalContext from "../store/globalContext";

function TicketsPage() {
  const globalCtx = useContext(GlobalContext);

  if (globalCtx.theGlobalObject.dataLoaded == true) {
    return <TicketList meetups={globalCtx.theGlobalObject.meetings} />;
  }
  return <div>Loading data from database, please wait . . . </div>;
}

export default TicketsPage;