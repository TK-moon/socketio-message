const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(express);
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;
const db = require("./db");

const socketIO = require("socket.io");

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server Lisetn on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.json({ server: true });
});

app.post("/auth/login", (req, res) => {
  console.log("LOGIN", req.body.id, req.body.password);
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

app.get("/user/list", (req, res) => {
  db.query(
    `SELECT * FROM user WHERE id!='${req.query.myUID}'`,
    (err, result) => {
      res.json(result);
    }
  );
});

app.get("/chat/room/list", (req, res) => {
  const query = `
  SELECT
  *,
  (SELECT username from user WHERE id=sender_id) as senderName,
  (SELECT username from user WHERE id=receiver_id) as receiverName,
  MAX(chat_message.created_at) as recentMessageTime
  FROM chat_message
  WHERE chat_message.sender_id='${req.query.UID}' OR chat_message.receiver_id='${req.query.UID}'
  GROUP BY sender_id, receiver_id
  ORDER BY chat_message.created_at DESC
  `;
  db.query(query, (err, result) => {
    console.log(result);
    res.json(result);
  });
});

// --------------SOCKET-------------------

const sockerPort = 3002;
const socketServer = http.createServer(express);
socketServer.listen(sockerPort);

const io = socketIO(socketServer, { path: "/io", cors: { origin: "*" } });

const chatNamespace = io.of("/chat");

const getRoomId = (_uid1, _uid2) => {
  const uid1 = Number(_uid1);
  const uid2 = Number(_uid2);
  const sortedUID = [uid1, uid2].sort();
  return `${sortedUID[0]}-${sortedUID[1]}`;
};

chatNamespace.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("enter-room", (data) => {
    const roomID = getRoomId(data.senderUID, data.receiverUID);
    console.log(roomID, "join room");
    socket.join(roomID);
  });

  socket.on("message", (data) => {
    console.log(data);
    db.query(
      `INSERT INTO chat_message(body, is_read, sender_id, receiver_id, type) VALUES('${data.body}', 1, ${data.senderUID}, ${data.receiverUID}, 'message')`
    );
    const roomID = getRoomId(data.senderUID, data.receiverUID);
    io.of("/chat").to(roomID).emit("message", data);
  });

  socket.on("leave-room", (data) => {
    const roomID = getRoomId(data.senderUID, data.receiverUID);
    console.log(roomID, "leave room");
    socket.leave(roomID);
  });

  socket.on("disconnect", (data) => {
    console.log(data);
  });
});
