function showTyping(isTyping) {
  const indicator = document.getElementById("typingIndicator");
  indicator.style.display = isTyping ? "block" : "none";
}

// Socket events
socket.on("typing", () => showTyping(true));
socket.on("stopTyping", () => showTyping(false));