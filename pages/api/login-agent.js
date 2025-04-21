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
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error logging in agent:", error);
    res.status(500).json({ error: "Failed to log in agent" });
  }
}
