// C:\Users\Mikaela\FYP-Frontend\pages\api\agents.js

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/agents");
  const data = await response.json();
  res.json(data);
}

export default handler;
