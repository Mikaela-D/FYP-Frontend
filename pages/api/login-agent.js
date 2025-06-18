export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, password } = req.body;

  try {
    const response = await fetch("http://localhost:8000/agents/agents/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json({ success: true, agent: data.agent }); // Include agent object with `_id`
  } catch (error) {
    console.error("Error logging in agent:", error);
    res.status(500).json({ error: "Failed to log in agent" });
  }
}
