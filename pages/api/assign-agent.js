// C:\Users\Mikaela\FYP-Frontend\pages\api\assign-agent.js

async function handler(req, res) {
  let { ticketId, agentId } = req.body;

  if (!ticketId || !agentId) {
    return res.status(400).json({ error: "ticketId and agentId are required" });
  }

  if (typeof ticketId !== "string" || ticketId.length !== 24) {
    return res.status(400).json({ error: "Invalid ticketId format" });
  }

  if (typeof agentId !== "string" || agentId.length !== 24) {
    return res.status(400).json({ error: "Invalid agentId format" });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/tickets/tickets/${ticketId}/assign`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error in /api/assign-agent:", error);
    res.status(500).json({ error: error.message });
  }
}

export default handler;
