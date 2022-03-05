import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { SocketContext } from "../contexts/SocketContext";
import { useParams,Link } from "react-router-dom";
import Navbar from "./Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const Project = () => {
  const findProject = (id) => {
    return projetDetails.find((data) => {
      return data._id === id;
    });
  };
  const { flag, getUserInfo, projetDetails, status } =
    useContext(UserInfoContext);
  // const {roomId} = getUserInfo();
  const { id } = useParams();
  const { level } = useContext(SocketContext);
  const [pathColor, setPathColor] = useState("green");
  const data = findProject(id);
  const setColor = () => {
    if (level <= 40) {
      setPathColor("green");
    } else if (level <= 65) {
      setPathColor("yellow");
    } else if (level <= 85) {
      setPathColor("orange");
    } else {
      setPathColor("red");
    }
  };
  useEffect(() => {
    setColor();
  }, [level]);

  return (
    <>
      <div className="h-full">
        <Navbar />
        <div className="mt-8">
        <Link className="px-4 py-2 rounded-md text-2xl font-semibold m-4 text-gray-600 border-4 hover:bg-gray-500 hover:text-white border-none bg-gray-200" to="/admin/overview">Back</Link>

        </div>
        {flag && (     
          <section className="mt-20">
            <div className="flex flex-col items-center justify-center">
              <div className="h-72 w-72 text-lg my-6">
                <CircularProgressbar
                  value={level}
                  text={`${level}%`}
                  styles={buildStyles({
                    textColor:`${pathColor}`,
                    backgroundColor: "#3e98c7",
                    pathColor: `${pathColor}`,
                  })}
                />
              </div>
              <p
                className={`block w-28 rounded-md text-center mx-3 p-1 mb-3 text-lg font-semibold border ${
                  status === "online"
                    ? "bg-green-200 text-green-600 border-green-600"
                    : "bg-orange-200 text-red-600 border-red-600"
                }`}
              >
                {status}
              </p>
              <p>
                <strong>Project Name:</strong> {data.projectName}
              </p>
              <p>
                <strong>Device ID:</strong> {data._id}
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Project;
