body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: #2196f3;
  color: white;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.share-header button {
  margin-left: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 14px;
}

.container {
  max-width: 480px;
  margin: auto;
  padding: 5px;
}

.video-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px 0;
}

video {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  background: black;
}

#chatArea {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  background: white;
  margin-bottom: 5px;
}

.chat-controls {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

#messageInput {
  flex: 1;
  height: 35px;
  border-radius: 5px;
  padding: 5px;
}