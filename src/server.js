const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(express);
const port = 3001;
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.json({ server: true });
});

app.listen(port, () => {
  console.log(`Server Lisetn on http://localhost:${port}`);
});

class ChatRoom {
  constructor() {
    this.chatRoom = [0, 0, 0, 0, 0, 0];
  }

  add(roomName) {
    const id = this.ranking.length + 1;
    this.chatRoom.push({ roomName: roomName, roomId: id });
  }

  list() {
    return this.chatRoom;
  }

  [Symbol.iterator]() {
    return this.ranking.values();
  }
}

const chatRoom = new ChatRoom();

app.get("/chat/list", (req, res) => {
  const roomList = chatRoom.list();
  console.log(roomList);
});

app.get("/chat/detail/:id", (req, res) => {});
