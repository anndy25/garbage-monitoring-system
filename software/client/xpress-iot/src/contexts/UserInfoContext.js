import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projetDetails, setProjectDetails] = useState([]);
  const [flag, setFlag] = useState(false);
  const [status,setStatus] = useState('offline');
  const [socketFlag,setSocketFlag] = useState(false);
 
  const setUserInfo = (data) => {
    localStorage.setItem("token", data);
    localStorage.setItem("userInfo", JSON.stringify(jwt_decode(data)));
  };
  const getUserInfo = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <UserInfoContext.Provider
      value={{
        setUserInfo,
        logout,
        getUserInfo,
        flag,
        projetDetails,
        setStatus,
        status,
        socketFlag,
        setSocketFlag,
        setFlag,
        setProjectDetails
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export { UserInfoProvider, UserInfoContext };
