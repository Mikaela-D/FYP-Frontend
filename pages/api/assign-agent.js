// C:\Users\Mikaela\FYP-Frontend\pages\api\assign-agent.js

async function handler(req, res) {
  const { ticketId, agentId } = req.body;

  const response = await fetch(
    `http://localhost:8000/api/tickets/${ticketId}/assign`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentId }),
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}

export default handler;
