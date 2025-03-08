// C:\Users\Mikaela\FYP-Frontend\pages\api\tickets-by-agent.js

async function handler(req, res) {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Agent name is required" });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/tickets/by-agent/${name}`
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default handler;
