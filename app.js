const socket = io(window.TIKTALK_BACKEND);

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Share menu toggle
const shareBtn = document.getElementById("share-btn");
const shareContainer = document.querySelector(".share-container");
shareBtn.addEventListener("click", () => {
  shareContainer.classList.toggle("open");
});

// Share links
const pageUrl = encodeURIComponent(window.location.href);
document.getElementById("share-whatsapp").href = `https://wa.me/?text=${pageUrl}`;
document.getElementById("share-instagram").href = `https://instagram.com/`;
document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?url=${pageUrl}`;
document.getElementById("share-copy").addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied!");
});

// Message send
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const nextBtn = document.getElementById("nextBtn");
const messagesDiv = document.getElementById("messages");

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const msg = input.value.trim();
  if (msg) {
    socket.emit("message", msg);
    addMessage("You", msg);
    input.value = "";
  }
}

function addMessage(user, msg) {
  const div = document.createElement("div");
  div.textContent = `${user}: ${msg}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Example Next button
nextBtn.addEventListener("click", () => {
  socket.emit("next");
});
