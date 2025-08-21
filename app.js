const socket = io(window.TIKTALK_BACKEND);

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const nextBtn = document.getElementById("nextBtn");

function appendMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("message", type);
  div.innerText = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, "me");
  socket.emit("message", text);
  input.value = "";
};

nextBtn.onclick = () => {
  socket.emit("next");
  messagesDiv.innerHTML = "";
};

socket.on("message", (msg) => {
  appendMessage(msg, "stranger");
});
