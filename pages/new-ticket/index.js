// C:\Users\Mikaela\FYP-Frontend\pages\new-ticket\index.js
import NewTicketForm from "../../components/tickets/NewTicketForm";
import { useRouter } from "next/router";
import GlobalContext from "../store/globalContext";
import { useContext, useEffect, useState } from "react";

function NewTicketPage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setCustomers(Array.isArray(data.customers) ? data.customers : []);
    }
    fetchCustomers();
  }, []);

  async function addTicketHandler(enteredTicketData) {
    await globalCtx.updateGlobals({
      cmd: "addTicket",
      newVal: enteredTicketData,
    });
    router.push("/");
  }

  return <NewTicketForm onAddTicket={addTicketHandler} customers={customers} />;
}

export default NewTicketPage;
