export default async function handler(req, res) {
  const { customerId } = req.query;
  if (!customerId) {
    return res.status(400).json({ error: "customerId is required" });
  }
  try {
    const response = await fetch(
      `http://localhost:8000/openai/messages/${customerId}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
