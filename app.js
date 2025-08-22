function showTyping(isTyping) {
  const indicator = document.getElementById("typingIndicator");
  indicator.style.display = isTyping ? "block" : "none";
}

// Example usage from server event
socket.on("typing", () => showTyping(true));
socket.on("stopTyping", () => showTyping(false));