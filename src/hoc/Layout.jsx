import React from "react";
import SideNavbar from "../components/SideNavbar";

const Layout = (Component) => {
  return function LayoutWrapper(props) {
    return (
      <div className="flex min-h-screen bg-secondary">
        {/* Sidebar remains fixed */}
        <div className="text-white fixed top-0 left-0 h-full z-10">
          <SideNavbar />
        </div>

        {/* Main Content Area with scrolling enabled */}
        <div className="flex flex-col flex-grow ml-[232px]">
          {/* 'ml-64' ensures the main content starts after the sidebar */}
          <main className="flex-grow overflow-y-auto h-screen">
            <Component {...props} />
          </main>
        </div>
      </div>
    );
  };
};

export default Layout;
