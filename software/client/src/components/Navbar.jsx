import React, { useState, useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";

const Navbar = () => {
  const { getUserInfo } = useContext(UserInfoContext);
  const { username, email} = getUserInfo();
  let acronym = username
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");

  return (
    <div>
      <div className="h-[9.4%] p-1 w-full border shadow-md ">
        <nav>
          <div className="flex justify-end">
            <div className={`mx-4 h-14 text-white font-semibold w-14 rounded-full ring-2 ring-white uppercase border flex justify-center items-center cursor-pointer shadow-lg bg-cyan-600`}>
              <p>
                {acronym[0]}
                {acronym[acronym.length - 1]}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
