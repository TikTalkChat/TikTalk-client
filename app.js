// =====================
// Original Chat Logic
// =====================
const socket = io(window.TIKTALK_BACKEND);

const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const nextBtn = document.getElementById("nextBtn");

sendBtn.addEventListener("click", () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit("message", msg);
    addMessage("You", msg);
    messageInput.value = "";
  }
});

nextBtn.addEventListener("click", () => {
  socket.emit("next");
  messagesDiv.innerHTML = "";
});

socket.on("message", (msg) => {
  addMessage("Stranger", msg);
});

function addMessage(sender, msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${sender}:</strong> ${msg}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// =====================
// Extra Features
// =====================

// 1. Enter to Send
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// 2. Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// 3. Share Button
const shareBtn = document.getElementById("share-btn");
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "TikTalk - Stranger Chat",
      text: "Chat instantly with strangers on TikTalk!",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  });
}
