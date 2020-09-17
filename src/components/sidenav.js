import React from "react";
import { NavLink } from 'react-router-dom';

const SideNav = () => (
  <div class="fixed z-30 inset-y-0 left-0 w-64 h-screen transition duration-300 transform bg-gray-100 bg-opacity-75 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0">
    <nav class="mt-10">
        <NavLink to='/' exact className="text-lg font-semibold flex items-center mt-4 py-2 px-6 border-l-4 bg-gray-100 bg-opacity-25 text-gray-500 border-gray-100 " activeStyle={{ color: "#2210FE", borderColor: "#2210FE"}}>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span class="mx-4 text-gray-800">Dashboard</span>
        </NavLink>
        <NavLink to='/add' className="text-lg font-semibold flex items-center mt-4 py-2 px-6 border-l-4 bg-gray-100 bg-opacity-25 text-gray-500 border-gray-100" activeStyle={{ color: "#2210FE", borderColor: "#2210FE"}}>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
            <span class="mx-4">Alerts</span>
        </NavLink>
        <NavLink to='/add' className="text-lg font-semibold flex items-center mt-4 py-2 px-6 border-l-4 bg-gray-100 bg-opacity-25 text-gray-500 border-gray-100" activeStyle={{ color: "#2210FE", borderColor: "#2210FE"}}>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>            <span class="mx-4">Statistics</span>
        </NavLink>
    </nav>
  </div>
);

export default SideNav;
