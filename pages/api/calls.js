// C:\Users\Mikaela\FYP-Frontend\pages\api\calls.js

export default async function handler(req, res) {
  const backendUrl = "http://localhost:8000/calls";

  if (req.method === "POST") {
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to save call data" });
    }
  } else if (req.method === "GET") {
    try {
      const response = await fetch(backendUrl);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch calls" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
