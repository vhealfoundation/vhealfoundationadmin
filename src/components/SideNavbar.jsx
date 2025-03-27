import React, { useState } from "react";
import { AiOutlineDashboard, AiOutlineLogout } from "react-icons/ai";
import { FaDonate, FaImages, FaInfoCircle, FaUsers } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useKindeAuth();
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`z-10 flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out 
        ${isCollapsed ? "w-16" : "w-[232px]"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1
          className={`text-xl font-bold transition-all duration-300 
            ${isCollapsed ? "hidden" : "block"}`}
        >
          D&M
        </h1>
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-white focus:outline-none ml-2"
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* User Info */}
      <div
        className={`flex items-center p-2 border-b border-gray-700 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <img
          src={user?.picture}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        {!isCollapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col">
        <Link to="/dashboard">
          <NavItem
            icon={<AiOutlineDashboard size={24} />}
            label="Dashboard"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/donations">
          <NavItem
            icon={<FaDonate size={24} />}
            label="Donations"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/beneficiaries">
          <NavItem
            icon={<FaUsers size={24} />}
            label="Beneficiaries"
            collapsed={isCollapsed}
          />
        </Link>
        
        <Link to="/about">
          <NavItem
            icon={<FaInfoCircle size={24} />}
            label="About"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/gallery">
          <NavItem
            icon={<FaImages size={24} />}
            label="Gallery"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/sections">
          <NavItem
            icon={<MdOutlineCategory size={24} />}
            label="What We Do"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/stories">
          <NavItem
            icon={<BsPersonLinesFill size={24} />}
            label="Accolades"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/testimonials">
          <NavItem
            icon={<BsPersonLinesFill size={24} />}
            label="Testimonials"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/appointments">
          <NavItem
            icon={<BsPersonLinesFill size={24} />}
            label="Appoinments"
            collapsed={isCollapsed}
          />
        </Link>
        <Link to="/slots">
          <NavItem
            icon={<BsPersonLinesFill size={24} />}
            label="Slots"
            collapsed={isCollapsed}
          />
        </Link>
        <div onClick={logout}>
          <NavItem
            icon={<AiOutlineLogout size={24} />}
            label="Logout"
            collapsed={isCollapsed}
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, collapsed }) => {
  return (
    <div className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer">
      <div className="flex items-center justify-center w-10 h-10">{icon}</div>
      {!collapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
    </div>
  );
};

export default SideNavbar;
