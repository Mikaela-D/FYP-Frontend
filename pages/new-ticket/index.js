// our-dimain.com/new-ticket
import NewTicketForm from "../../components/tickets/NewTicketForm";
import { useRouter } from "next/router";
import GlobalContext from "../store/globalContext";
import { useContext } from "react";

function NewTicketPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  async function addTicketHandler(enteredticketData) {
    await globalCtx.updateGlobals({
      cmd: "addTicket",
      newVal: enteredticketData,
    });
    router.push("/");
  }

  return <NewTicketForm onAddTicket={addTicketHandler} />;
}

export default NewTicketPage;
