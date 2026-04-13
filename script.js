async function gen() {

  let k = document.getElementById("kw").value.trim();
  let res = document.getElementById("res");

  if (!k) {
    alert("Enter keyword");
    return;
  }

  res.innerHTML = "⏳ Generating...";

  try {

    console.log("Sending request...");

    let r = await fetch("https://fahmyai.onrender.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: k })
    });

    console.log("Response:", r);

    let data = await r.json();

    console.log("Data:", data);

    res.innerHTML = JSON.stringify(data);

  } catch (e) {
    console.error("ERROR:", e);
    res.innerHTML = "❌ Error";
  }

}
