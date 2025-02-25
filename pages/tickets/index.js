import MeetupList from "../../components/meetups/MeetupList";
import { useContext } from "react";
import GlobalContext from "../store/globalContext";

function TicketsPage() {
  const globalCtx = useContext(GlobalContext);

  if (globalCtx.theGlobalObject.dataLoaded == true) {
    return <MeetupList meetups={globalCtx.theGlobalObject.meetings} />;
  }
  return <div>Loading data from database, please wait . . . </div>;
}

export default TicketsPage;