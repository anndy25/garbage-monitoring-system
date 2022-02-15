require("dotenv").config();
const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const mongoDBConnection = require("./db");
const userRouter = require("./routers/userRouter");
const { updateDeviceInfo } = require("./services/deviceService");
const deviceRouter = require("./routers/deviceRouter");
const PORT = process.env.PORT || 8080;
app.use(express.json());

var corsOptions = {
  origin:process.env.WEBSITE_URL,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use("/api/user", userRouter);
app.use("/api/device", deviceRouter);

mongoDBConnection();

const io = require("socket.io")(server, {
  cors: {
    origin:process.env.WEBSITE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
io.on("connection", (socket) => {
  socket.emit("welcome", { id: socket.id });
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`from web ${roomId}`);
  });

  socket.on("join", ({ roomId, deviceId }) => {
    socket.deviceId = deviceId;
    socket.roomId = roomId;
    // console.log(`from device ${roomId}`);
    console.log(deviceId);
    socket.join(roomId);
    socket.broadcast
      .to(roomId)
      .emit("device-connected", { socketId: socket.id, status: "online" });
    updateDeviceInfo(deviceId, { status: "online", socketId: socket.id });
  });

  socket.on("room-message", (rdata) => {
    const { deviceId, roomId } = socket;
    let data = { data: { ...rdata } };

    updateDeviceInfo(deviceId, data);
    // console.log(data);
    socket.broadcast.to(roomId).emit("room-message", { data: rdata });
  });

  socket.on("disconnect", () => {
    const { deviceId, roomId } = socket;
    if (deviceId) {
      updateDeviceInfo(deviceId, { status: "offline", socketId: null });
      socket.broadcast
        .to(roomId)
        .emit("device-disconnected", { deviceId, status: "offline" });
    }
    // console.log(socket.id);
  });
});

const hostname = "192.168.0.103";
server.listen(PORT, hostname, () => {
  // console.log(`server is running on port http://${hostname}:${PORT}`)
});
