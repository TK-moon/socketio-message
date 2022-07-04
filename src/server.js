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

app.get("/chat/list", (req, res) => {});

app.get("/chat/detail/:id", (req, res) => {});
