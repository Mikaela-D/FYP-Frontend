// C:\Users\Mikaela\FYP-Frontend\pages\api\create-customer.js

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/tickets/createCustomer", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;
