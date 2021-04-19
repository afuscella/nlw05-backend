import express from 'express';

const PORT = 3333;
const app = express();

app.get("/", (req, res) => {
  return res.json({ message: 'Retrieve' });
});

app.post("/", (req, res) => {
  return res.json({ message: 'Created' });
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
