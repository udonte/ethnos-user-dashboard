import React from "react";
import CustomInput from "./CustomInput";
import { FaBell, FaCircle, FaSearch } from "react-icons/fa";
import placeholderImage from "../assets/adeola.png";

const Header = () => {
  return (
    <div className="bg-ethnos-blue-600 flex items-center justify-between py-4 px-4">
      {/* search */}
      <div className="w-[30%] ">
        <div className=" ">
          <div className="w-full relative">
            <CustomInput
              size={"small"}
              placeholder={"Search"}
              inputClassName={`rounded-xl px-4 py-2 pr-4 text-sm text-ethnos-blue-600`}
            />
            <div className="absolute top-2 right-4 text-gray-500 font-thin">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      {/* profile and notifs */}
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <FaBell size={20} className="text-white" />
          <FaCircle
            color="#DB0000"
            size={10}
            className="absolute bottom-3 left-2"
          />
        </div>
        <div className="rounded-full flex items-center justify-center h-[20px] w-[20px] md:w-[30px] md:h-[30px] overflow-hidden">
          <img
            src={placeholderImage}
            alt={""}
            className="rounded-full h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
