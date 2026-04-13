async function gen() {

  let k = document.getElementById("kw").value.trim();
  let res = document.getElementById("res");

  // تحقق من الإدخال
  if (!k) {
    alert("Enter keyword");
    return;
  }

  res.innerHTML = "⏳ Generating...";

  try {

    let r = await fetch("https://fahmyai.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: k })
    });

    if (!r.ok) {
      throw new Error("Server error");
    }

    let names = await r.json();

    // عرض النتائج بشكل جميل
    res.innerHTML = names.map(n => `
      <div style="
        padding:10px;
        margin:5px;
        border:1px solid #ddd;
        border-radius:8px;
        background:#f9f9f9;
        font-weight:bold;
      ">
        ${n}.com
      </div>
    `).join("");

  } catch (e) {
    console.error(e);
    res.innerHTML = "❌ Error connecting to server";
  }

}
