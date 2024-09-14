import React from "react";
import CustomInput from "./CustomInput";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <div className="bg-ethnos-blue-600 flex items-center">
      <div className="w-[30%] ">
        <div className=" text-white p-5">
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
    </div>
  );
};

export default Header;
