
const socket = io("https://your-server-url.onrender.com");

const chatBox = document.getElementById('chat-box');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const msg = input.value;
  if(msg.trim() !== '') {
    socket.emit('message', msg);
    input.value = '';
  }
});

socket.on('message', (data) => {
  let div = document.createElement('div');
  div.textContent = data;
  chatBox.appendChild(div);
});
