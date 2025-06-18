// C:\Users\Mikaela\FYP-Frontend\pages\api\agents.js
// This code gets the available agents from the database

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/agents/agents");
  const data = await response.json();
  // Filter agents to only those who can login (e.g., have a password or canLogin flag)
  const realAgents = data.filter((agent) => agent.password || agent.canLogin);
  res.json(realAgents);
}

export default handler;
