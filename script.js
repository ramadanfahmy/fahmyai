
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const message = input.value;

  if (!message) return;

  chatBox.innerHTML += `<div class="user">${message}</div>`;
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div class="bot">${data.reply}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div class="bot">Error connecting to AI server</div>`;
  }
}
