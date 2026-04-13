
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 API KEY من Environment (مش في الكود)
const API_KEY = process.env.API_KEY;

// ✅ Route للتأكد إن السيرفر شغال
app.get("/", (req, res) => {
  res.send("FahmyAI API is working 🚀");
});

// ✅ API لتوليد أسماء دومينات
app.post("/generate", async (req, res) => {

  const { keyword } = req.body;

  // تحقق من الإدخال
  if (!keyword) {
    return res.status(400).json(["Please enter a keyword"]);
  }

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 7 short, brandable, catchy domain names for: ${keyword}. Only return names without explanation.`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // تنظيف الأسماء
    let names = text
      .split("\n")
      .map(n => n.replace(/[^a-zA-Z0-9]/g, ""))
      .filter(n => n.length > 2);

    res.json(names.slice(0, 7));

  } catch (error) {
    console.error(error);
    res.status(500).json(["Server error"]);
  }
app.use(cors({
  origin: "*"
}));
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
