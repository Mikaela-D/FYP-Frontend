// C:\Users\Mikaela\FYP-Frontend\pages\api\tickets-by-agent.js

async function handler(req, res) {
  const { agentId } = req.query;
  if (!agentId) {
    return res.status(400).json({ error: "Agent ID is required" });
  }

  try {
    const backendUrl = `http://localhost:8000/tickets/by-agent-id/${agentId}`;
    console.log("Fetching agent tickets from:", backendUrl);
    const response = await fetch(backendUrl);

    const text = await response.text(); // Read response as text for debugging
    console.log("Backend response text:", text); // Debugging line

    let data;
    try {
      data = JSON.parse(text); // Attempt to parse JSON
    } catch (parseErr) {
      console.error("Failed to parse backend response as JSON:", text);
      return res
        .status(500)
        .json({ error: "Invalid backend response", details: text });
    }

    if (!response.ok) {
      console.error("Backend error:", data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/tickets-by-agent:", error);
    res.status(500).json({ error: error.message });
  }
}

export default handler;
