// app.js — makes the chat box work: sends your message to the agent and shows
// the reply. You usually won't need to touch this.

const chat = document.getElementById("chat");
const form = document.getElementById("composer");
const input = document.getElementById("input");
const sendBtn = form.querySelector(".send");

// Add a message bubble to the chat. who = "you" or "agent".
function addBubble(text, who, extraClass = "") {
  const row = document.createElement("div");
  row.className = "msg " + who;
  const bubble = document.createElement("div");
  bubble.className = "bubble " + extraClass;
  bubble.textContent = text;
  row.appendChild(bubble);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
  return bubble;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  // Show your message, clear the box, lock the button while we wait.
  addBubble(message, "you");
  input.value = "";
  sendBtn.disabled = true;

  // Show a "typing…" bubble while the agent thinks.
  const typing = addBubble("typing…", "agent", "typing");

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    typing.classList.remove("typing");
    typing.textContent = data.reply || "(no reply)";
  } catch (err) {
    typing.classList.remove("typing");
    typing.textContent = "(Couldn't reach the agent. Is it still running?)";
  } finally {
    sendBtn.disabled = false;
    input.focus();
    chat.scrollTop = chat.scrollHeight;
  }
});
