const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:5173";
const socketIO = require("socket.io")(http, {
  cors: {
    origin: allowedOrigins.split(","),  // Support multiple origins by splitting the string
    methods: ["GET", "POST"]
  }
});

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
