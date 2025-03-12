// C:\Users\Mikaela\FYP-Frontend\pages\add-client.js

import NewClientForm from "../components/clients/NewClientForm";

function AddClientPage() {
  async function addClientHandler(clientData) {
    const response = await fetch("/api/new-client", {
      method: "POST",
      body: JSON.stringify(clientData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  return <NewClientForm onAddClient={addClientHandler} />;
}

export default AddClientPage;
