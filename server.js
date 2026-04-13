import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ضع الـ API Key هنا
const API_KEY = "PUT_YOUR_GOOGLE_API_KEY";

// استلام الطلبات
app.post("/generate", async (req, res) => {

 const { keyword } = req.body;

 try {
   const response = await fetch(
     https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY},
     {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         contents: [{
           parts: [{
             text: Generate domain names for: ${keyword}
           }]
         }]
       })
     }
   );

   const data = await response.json();

   let names = data.candidates?.[0]?.content?.parts?.[0]?.text.split("\n")
     .map(n => n.replace(/[^a-zA-Z0-9]/g, ""))
     .filter(n => n.length > 2);

   res.json(names.slice(0, 7));
 } catch (e) {
   res.status(500).json(["error"]);
 }
});

app.listen(3000, () => console.log("Server is running"));
