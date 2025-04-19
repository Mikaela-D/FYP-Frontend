// C:\Users\Mikaela\FYP-Frontend\pages\api\delete-ticket.js

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/tickets/deleteTicket", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  res.json(data);
}

export default handler;
