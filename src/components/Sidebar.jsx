import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaStickyNote, FaTasks, FaCog } from "react-icons/fa";
import { BiPhotoAlbum } from "react-icons/bi";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineArrowRightCircle,
} from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";

const sidebarItems = [
  { page: "Users", icon: <FaUsers />, path: "/users" },
  { page: "Posts", icon: <FaStickyNote />, path: "/posts" },
  { page: "Todos", icon: <FaTasks />, path: "/todos" },
  { page: "Albums", icon: <BiPhotoAlbum />, path: "/albums" },
  { page: "Settings", icon: <FaCog />, path: "/settings" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative placeholder:top-0 left-0 z-30 h-screen bg-white text-white p-4  ${
        isCollapsed ? "w-16" : "w-60"
      } transition-all duration-300`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="text-white mb-4 absolute right-[-10px]"
      >
        {isCollapsed ? (
          <HiOutlineArrowRightCircle
            className="text-gray-400 bg-white rounded-full  hover:text-gray-500"
            size={20}
          />
        ) : (
          <HiOutlineArrowLeftCircle
            className="text-gray-400 bg-white rounded-full  hover:text-gray-500"
            size={20}
          />
        )}
      </button>

      {/* Navigation Items */}
      <nav>
        <ul>
          <li className="mb-12">
            <NavLink
              className={`text-ethnos-blue-300 font-manrope  flex items-center space-x-2    ${
                isCollapsed ? "w-fit" : " w-full"
              }`}
            >
              <span className="text-3xl">
                <MdOutlineDashboard />
              </span>
              {!isCollapsed && (
                <span className="font-extrabold text-xl">Ethnos Dash</span>
              )}
            </NavLink>
          </li>
          {sidebarItems.map((link) => {
            return (
              <li key={link.page} className="mb-4">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2  hover:bg-ethnos-blue-300 hover:text-white p-2 rounded ${
                      isActive
                        ? "bg-ethnos-blue-300 text-white font-bold"
                        : " text-ethnos-blue-300 bg-white"
                    }
                       ${isCollapsed ? "w-fit" : " w-full"}`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  {!isCollapsed && <span className="">{link.page}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
