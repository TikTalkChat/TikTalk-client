// Format time as 12-hour with AM/PM
function formatTime(date) {
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${minutes} ${ampm}`;
}

// Main function to render messages
function renderMessage(text, sender) {
  const msgTime = formatTime(new Date());

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`; // sender = 'you' or 'stranger'

  messageDiv.innerHTML = `
    <span class="label">${sender === "you" ? "You" : "Stranger"}</span>
    <span class="msg-text">${text}</span>
    <span class="timestamp">${msgTime}</span>
  `;

  // Append new message div to messages container
  const messagesContainer = document.getElementById("messages");
  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom smoothly when new message arrives
  messagesContainer.scrollTo({
    top: messagesContainer.scrollHeight,
    behavior: "smooth",
  });
}

// Example usage:

// When you send a message
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  renderMessage(text, "you");

  // TODO: Emit message to backend server here

  input.value = "";
});

// Simulate receiving a stranger message (for testing)
setTimeout(() => {
  renderMessage("Hello from stranger!", "stranger");
}, 3000);