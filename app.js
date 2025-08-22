function toWsUrl(httpBase) {
  const url = new URL(httpBase);
  const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
  return `${wsProtocol}//${url.host}/ws`;
}

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const nextBtn = document.getElementById("nextBtn");

let ws;

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function connectStranger() {
  messagesDiv.innerHTML = "<div class='popup'>🔍 Searching for a stranger...</div>";

  const WS_URL = toWsUrl(window.TIKTALK_BACKEND);
  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    messagesDiv.innerHTML = "<div class='popup'>✅ Connected! Say Hi 👋</div>";
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        addMessage(data.text, "stranger");
      }
    } catch {
      addMessage(event.data, "stranger");
    }
  };

  ws.onclose = () => {
    messagesDiv.innerHTML = "<div class='popup'>❌ Stranger disconnected</div>";
  };
}

sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text || ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify({ type: "message", text }));
  addMessage(text, "me");
  input.value = "";
});

nextBtn.addEventListener("click", () => {
  ws.close();
  connectStranger();
});

connectStranger();