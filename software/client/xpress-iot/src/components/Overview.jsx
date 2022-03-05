import React, { useState, useContext, useEffect } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import api from "../api/siteApi";
import Navbar from "./Navbar";
import { MdOpenInNew, MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const Overview = () => {
  const {
    setProjectDetails,
    getUserInfo,
    setStatus,
    setFlag,
    status,
    projetDetails,
    flag
  } = useContext(UserInfoContext);
  const allProject = async () => {
    if (localStorage.getItem("userInfo") && localStorage.getItem("token")) {
      const { userId } = getUserInfo();
      try {
        setFlag(false);
        const { data } = await api.get(`api/device/projects/${userId}`);
        setProjectDetails(data);
        console.log(data);
        setStatus(data[0].status);
        setFlag(true);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    allProject();
  }, []);
  return (
    <>
      <div className="h-full">
        <Navbar />

        <div className="p-8">
          <h2 className="text-3xl font-semibold text-gray-700 my-8">
            Your Projects
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="h-60 border flex flex-col justify-center items-center text-cyan-700 text-xl font-semibold shadow-lg rounded-md cursor-pointer hover:bg-cyan-50">
              <MdAdd className="text-4xl" />
              <p>Add Project</p>
            </div>
            {flag && projetDetails.map((data, index) => {
              return (
                <Link to={`/admin/project/${data._id}`} key={index}>
                  <div className="h-60 border flex flex-col shadow-lg rounded-md cursor-pointer hover:bg-cyan-50">
                    <h2 className="mx-3 mt-3 mb-1 text-lg font-semibold">
                      {data.projectName}
                    </h2>
                    <h2 className="mx-3 font-light">{data._id}</h2>
                    <p
                      className={`block w-28 rounded-md text-center mx-3 p-1 mt-3 mb-1 text-lg font-semibold border ${
                        status === "online"
                          ? "bg-green-200 text-green-600 border-green-600"
                          : "bg-orange-200 text-red-600 border-red-600"
                      }`}
                    >
                      {status}
                    </p>
                    <MdOpenInNew className="mt-auto text-3xl text-gray-600 font-semibold mb-4 ml-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
