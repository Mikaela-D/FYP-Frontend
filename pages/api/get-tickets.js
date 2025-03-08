// C:\Users\Mikaela\FYP-Frontend\pages\api\get-tickets.js

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/readTicket", {
    method: "POST",
    body: JSON.stringify({ cmd: "all" }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;
