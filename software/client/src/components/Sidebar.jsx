import React, { useContext } from "react";
import Swal from "sweetalert2";
import { NavLink} from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { GoProject } from "react-icons/go";

const Sidebar = () => {
  const{logout}=useContext(UserInfoContext);
  return (
    <>
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800  h-full flex flex-col text-white">
        <h2 className="px-3 my-4 text-3xl text-white font-semibold">Express</h2>
        <hr className="border-b-white border-b-2 bg-white" />
        <div className="text-lg">
          <ul className="py-4">
            <li className="px-2">
              <NavLink
                to="/admin/overview"
                className="flex items-center w-ful p-2"
                style={({ isActive }) => {
                return isActive ? {backgroundColor:"rgba(255,255,255,.2)" ,borderRight:"solid white 4px"}:null
              }}
              >
                <GoProject className="mr-2 text-white" />
                Overview
              </NavLink>
            </li>
          </ul>
        </div>
        <button
          className="p-2 mt-auto w-6/12 mx-2 my-4 flex justify-center items-center rounded-lg text-red-500 border border-red-500  space-x-1 hover:bg-red-500 hover:text-white hover:border-red-500 whitespace-nowrap font-medium "
          onClick={() =>
            Swal.fire({
              icon: "warning",
              iconColor: "purple",
              title: "Do you want to Log Out?",
              showCancelButton: true,
              cancelButtonColor: "green",
              cancelButtonText: "No",
              confirmButtonText: "Yes",
              confirmButtonColor: "red",
            }).then((result) => {
              if (result.isConfirmed) {
                logout();
              }
            })
          }
        >
          <p>Log Out</p>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
