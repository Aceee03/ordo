import React from "react";
import {
  IconUser,
  IconFileDescription,
  IconSettings,
  IconDental,
} from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-18 m-0 lg:flex flex-col hidden bg-pink-200 place-items-center py-5 shadow-lg">
      <a href="/">
        <IconDental className="hover:cursor-pointer" size={40} />
      </a>
      <div className="border-[1px] w-1/2 px-4 my-4 rounded-full"></div>
      <ul className="flex flex-col gap-4">
        <li className="sidebar-item group">
          <a>
            <IconUser className="" size={40} />
          </a>
          <span className="sidebar-tooltip group-hover:scale-100">Patients</span>
        </li>
        <li className="sidebar-item group">
          <a>
            <IconFileDescription className="" size={40} />
          </a>
          <span className="sidebar-tooltip group-hover:scale-100">Ordonnances</span>
        </li>
        <li className="sidebar-item group">
          <a>
            <IconSettings className="" size={40} />
          </a>
          <span className="sidebar-tooltip group-hover:scale-100">Paramètres</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
