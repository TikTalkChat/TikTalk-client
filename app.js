const socket = io(window.TIKTALK_BACKEND);

// Elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const emojiBtn = document.getElementById('emojiBtn');
const imageBtn = document.getElementById('imageBtn');

// Video Stream
let localStream;
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => { localVideo.srcObject = stream; localStream = stream; })
  .catch(err => alert('Camera/Mic access needed'));

// Send message
sendBtn.addEventListener('click', ()=>{
  const msg = messageInput.value.trim();
  if(msg){
    appendMessage('You', msg);
    socket.emit('chat-message', msg);
    messageInput.value = '';
  }
});

// Receive message
socket.on('chat-message', data => {
  appendMessage('Stranger', data);
});

function appendMessage(sender, msg){
  const p = document.createElement('p');
  p.textContent = `${sender}: ${msg}`;
  chatArea.appendChild(p);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Emoji
emojiBtn.addEventListener('click', ()=>{
  const emoji = prompt("Enter emoji:");
  if(emoji) messageInput.value += emoji;
});

// Image
imageBtn.addEventListener('click', ()=>{
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = e => {
    let file = e.target.files[0];
    if(file) appendMessage('You', '[Image] ' + file.name);
    // Backend send code required
  }
  input.click();
});

// Share buttons
function shareApp(platform){
  const url = "https://TikTalkchat.github.io/tiktalk-client/";
  if(platform==='whatsapp'){
    window.open(`https://wa.me/?text=Check TikTalk: ${url}`);
  } else if(platform==='facebook'){
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  } else if(platform==='copy'){
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }
}