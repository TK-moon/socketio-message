const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(express);
const dayjs = require("dayjs");
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
  /**
   * @TODO
   * Total count 추가하여 전체 로딩되면 추가 로딩 불가능하도록 useQuery 옵션 추가
   */
  const query = `
  SELECT
  *,
  body as recentMessage,
  (SELECT username from user WHERE id=sender_id) as senderName,
  (SELECT username from user WHERE id=receiver_id) as receiverName,
  MAX(chat_message.created_at) as recentMessageTime
  FROM chat_message
  WHERE chat_message.sender_id=${req.query.UID} OR chat_message.receiver_id=${req.query.UID}
  GROUP BY sender_id, receiver_id
  HAVING sender_id=${req.query.UID} or receiver_id=${req.query.UID}
  ORDER BY recentMessageTime DESC
  `;
  db.query(query, (err, result) => {
    res.json(result);
  });
});

app.get("/chat/room/detail", (req, res) => {
  const queryWithBaseID = `AND id < ${req.query.baseID}`;
  const dataQuery = `
  SELECT
  id,
  sender_id as senderUID,
  receiver_id as receiverUID,
  body,
  created_at,
  (SELECT username from user WHERE id=sender_id) as senderUsername,
  (SELECT username from user WHERE id=receiver_id) as receiverUsername
  FROM chat_message
  WHERE
  1
  ${req.query.baseID ? queryWithBaseID : ""}
  AND ((
    sender_id=${req.query.senderUID} AND
    receiver_id=${req.query.receiverUID}
  )
  OR (
    sender_id=${req.query.receiverUID} AND
    receiver_id=${req.query.senderUID}
  ))
  ORDER BY created_at DESC
  LIMIT ${req.query.limit};
  `;

  const countQuery = `
  SELECT
  count(*) as totalCount
  FROM chat_message
  WHERE sender_id=${req.query.senderUID} AND receiver_id=${req.query.receiverUID} OR
  sender_id=${req.query.receiverUID} AND receiver_id=${req.query.senderUID};
  `;

  const query = dataQuery + countQuery;

  db.query(query, (error, result, field) => {
    const data = {
      list: result[0].reverse(),
      totalCount: result[1][0].totalCount,
    };
    res.json(data);
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
    db.query(
      `UPDATE chat_message SET is_read=1 WHERE sender_id='${data.receiverUID}' AND receiver_id=${data.senderUID}`,
      (error, result) => {}
    );
  });

  socket.on("message", (data) => {
    const roomID = getRoomId(data.senderUID, data.receiverUID);
    const roomMap = socket.adapter.rooms.get(roomID);
    const isAnotherUserInRoom = roomMap ? roomMap.size > 1 : false;
    const isRead = isAnotherUserInRoom ? 1 : 0;
    // const isOnline = socket.adapter.rooms.get(roomID).length > 1;
    db.query(
      `
      INSERT INTO
      chat_message(body, is_read, sender_id, receiver_id, type)
      VALUES('${data.body}', '${isRead}', ${data.senderUID}, ${data.receiverUID}, 'message')
      `,
      (error, result) => {
        const response = {
          ...data,
          id: result.insertId,
          created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        };
        io.of("/chat").to(roomID).emit("message", response);
      }
    );
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
