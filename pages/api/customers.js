// C:\Users\Mikaela\FYP-Frontend\pages\api\customers.js

async function handler(req, res) {
  // If a customerId is provided as a query param, fetch their messages instead of all customers
  const { customerId } = req.query;
  if (customerId) {
    // Proxy to backend to get conversation messages for this customer
    try {
      console.log("Requesting messages for customerId:", customerId); // Debug start
      const response = await fetch(
        `http://localhost:8000/openai/messages/${customerId}`
      );
      const text = await response.text();
      console.log("Raw backend response for messages:", text); // Debug raw response
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("Failed to parse backend response as JSON:", text);
        return res
          .status(500)
          .json({ messages: [], error: "Invalid backend response" });
      }
      console.log(
        "Parsed messages for customerId",
        customerId,
        ":",
        data.messages
      ); // Debug parsed
      res.json({ messages: data.messages || [] });
    } catch (err) {
      console.error(
        "Error fetching messages for customerId",
        customerId,
        ":",
        err
      );
      res.status(500).json({ messages: [], error: err.message });
    }
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/tickets/customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Defensive: handle both {customers: [...]}, or just [...]
    let customers = [];
    if (Array.isArray(data)) {
      customers = data;
    } else if (Array.isArray(data.customers)) {
      customers = data.customers;
    }

    console.log("Fetched customers from backend:", customers); // Debugging log

    res.json({ customers });
  } catch (err) {
    res.status(500).json({ customers: [], error: err.message });
  }
}

export default handler;
