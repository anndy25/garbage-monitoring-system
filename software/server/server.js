const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const mongoDBConnection =require("./db");
const userRouter =require("./router/userRouter");
const deviceRouter =require("./router/deviceRouter");
const PORT=process.env.PORT || 8080;



app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/device",deviceRouter);

mongoDBConnection();

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST","PUT","DELETE" ]
	}
})
io.on("connection", (socket) => {
	
	socket.on("join-room",({name,roomID})=>{
		socket.join(roomID);
		socket.emit("welcome-message",`welcome ${name}, Your ID is:${socket.id}`);
		socket.broadcast.to(roomID).emit("inform-message",{name,socketID:socket.id});
	})

	socket.on("room-message",({data,roomID}) => {
		socket.broadcast.to(roomID).emit("room-message",data)
	})
	
	socket.on("disconnect", () => {
		
	})

})

const hostname="192.168.0.102";
server.listen(PORT, () => console.log(`server is running on port http://${hostname}:${PORT}`));