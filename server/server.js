const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(express);
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const io = require("socket.io")(server);
const db = require("./db");

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class ChatRoom {
  constructor() {
    this.chatRoom = new Array(100).fill(0);
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

app.get("/", (req, res) => {
  res.json({ server: true });
});

app.post("/auth/login", (req, res) => {
  db.query(
    `SELECT * FROM user WHERE userid='${req.body.id}' AND password='${req.body.password}'`,
    (error, result) => {
      if (error) throw error;

      if (!result[0]) {
        res.json(null);
      }
      res.json(result[0]);
    }
  );
});

app.get("/chat/list", (req, res) => {
  const roomList = chatRoom.list();
  const data = JSON.stringify(roomList);
  res.json(data);
});

app.get("/chat/detail/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`Server Lisetn on http://localhost:${port}`);
});
