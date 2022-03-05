import React, { useState, useEffect, createContext, useContext } from "react";
import { UserInfoContext } from "./UserInfoContext";
const io = require("socket.io-client");
const SocketContext = createContext();
const socket = io("https://api-xpress-iot.herokuapp.com/");

const SocketProvider = ({ children }) => {
  const { setStatus, socketFlag, setSocketFlag,getUserInfo,status } = useContext(UserInfoContext);
  const [level, setLevel] = useState(0);
  const [deviceSocketId, setDeviceSocketId] = useState();
  const [userSocketId, setUserSocketId] = useState();

  useEffect(() => {
    if ((!socketFlag) && (localStorage.getItem("userInfo")) && (localStorage.getItem("token"))) {
      const {roomId}=getUserInfo();
      socket.emit("join-room", {roomId});
      setSocketFlag(true)
    }
  }, []);
  useEffect(() => {
    socket.on("welcome", ({ id }) => setUserSocketId(id));
    socket.on("room-message", ({ data }) => {
      setLevel(data.level);
    });
    socket.on("device-connected", ({status}) => {
      setStatus(status);
    });
    socket.on("device-disconnected", ({ status, socketId }) => {
      setStatus(status);
      setDeviceSocketId(socketId);
    });
  }, [deviceSocketId, level, userSocketId,status]);

  return (
    <SocketContext.Provider
      value={{
        level,
        setLevel,
        deviceSocketId,
        setDeviceSocketId,
        userSocketId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
