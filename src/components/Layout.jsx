import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar />

      {/* main content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main
          className="flex-1 p-2 md:p-5 bg-ethnos-gray-200 overflow-y-scroll  "
          style={{
            scrollbarWidth: "none" /* For Firefox */,
            WebkitScrollbarWidth: "none" /* For WebKit-based browsers */,
            scrollbarTrackColor:
              "#f1f1f1" /* Background color of the scrollbar track */,
            scrollbarColor:
              "#888 #f1f1f1" /* Color of the scrollbar thumb and track */,
            borderRadius: "4px" /* Radius of the scrollbar thumb */,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
