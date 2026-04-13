const express = require("express");
const app = express();

app.use(express.json());

app.post("/chat", (req, res) => {
  res.json({ reply: "AI working ✅" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started"));
