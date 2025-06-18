// C:\Users\Mikaela\FYP-Frontend\pages\api\customers.js

async function handler(req, res) {
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

    res.json({ customers });
  } catch (err) {
    res.status(500).json({ customers: [], error: err.message });
  }
}

export default handler;
