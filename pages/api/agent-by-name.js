// C:\Users\Mikaela\FYP-Frontend\pages\api\agent-by-name.js

async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Agent name is required" });
  }

  try {
    const response = await fetch(
      `http://localhost:8000/agents/agents/by-name/${name}`
    );
    const agent = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json(agent);
    }

    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default handler;
