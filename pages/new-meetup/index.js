// our-dimain.com/new-meetup
import NewTicketForm from "../../components/meetups/NewMeetupForm";
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
