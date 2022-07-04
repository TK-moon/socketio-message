const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(express);
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;
const db = require("./db");

const socketIO = require("socket.io");
const io = socketIO(server, { path: "/io", cors: { origin: "*" } });

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post("/chat/room/create", (req, res) => {
  db.query(
    `INSERT INTO chat_room(name) VALUES ('${req.body.roomName}')`,
    (error, result) => {
      console.log(result);
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

server.listen(port, () => {
  console.log(`Server Lisetn on http://localhost:${port}`);
});

// --------------SOCKET-------------------

const chatNamespace = io.of("/chat");

chatNamespace.on("connection", function (socket) {
  console.log("a user connected");
});
