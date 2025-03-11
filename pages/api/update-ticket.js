// C:\Users\Mikaela\FYP-Frontend\pages\api\update-ticket.js

async function handler(req, res) {
  console.log("Request Body:", req.body); // Debugging line

  console.log("API received update request:", req.body); // Debugging

  if (!req.body._id) {
    return res.status(400).json({ response: "fail", error: "Missing _id" });
  }

  const response = await fetch("http://localhost:8000/tickets/updateTicket", {
    method: "PUT",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  res.json(data);
}

export default handler;
