// our-dimain.com/new-ticket
import NewTicketForm from "../../components/tickets/NewTicketForm";
import { useRouter } from "next/router";
import GlobalContext from "../../pages/store/globalContext";
import { useContext } from "react";

function NewMeetupPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function addMeetupHandler(enteredticketData) {
    await globalCtx.updateGlobals({
      cmd: "addMeeting",
      newVal: enteredticketData,
    });
    router.push("/");
  }

  return <NewTicketForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
