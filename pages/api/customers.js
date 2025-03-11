// C:\Users\Mikaela\FYP-Frontend\pages\api\customers.js

async function handler(req, res) {
  const response = await fetch("http://localhost:8000/customers/customers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  res.json(data);
}

export default handler;
